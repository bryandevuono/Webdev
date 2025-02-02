using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
public class EventAttendanceService : IEventAttService
{
    private readonly MyDbContext _context;

    public EventAttendanceService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<bool> IsUserAttendingEvent(Guid userId, Guid eventId)
    {
        return await _context.EventAttendance.AnyAsync(ea => ea.UserId == userId && ea.EventId == eventId);
    }

    public async Task<Guid> GetIdByUserIdEventId(Guid userId, Guid eventId)
    {
        var attendance = await _context.EventAttendance
        .FirstOrDefaultAsync(a => a.UserId == userId && a.EventId == eventId);

        if (attendance == null)
        {
            return Guid.Empty;
        }

        return attendance.Id;
    }

    public async Task<bool> AttendEvent(EventAttendance att)
    {
        var alreadyAttending = await _context.EventAttendance
        .AnyAsync(a => a.UserId == att.UserId && a.EventId == att.UserId);
        if (alreadyAttending)
        {
            return false;
        }
        _context.EventAttendance.Add(att);
        await AssignPoints(att);

        return true;
    }

    public async Task<List<EventAttendance>> GetAttendeesByEventTitle(string title)
    {
        var eventEntity = await _context.Events
        .FirstOrDefaultAsync(e => e.Title == title);

        if (eventEntity == null)
        {
            return null;
        }

        var attendees = await _context.EventAttendance
            .Where(ea => ea.EventId == eventEntity.Id)
            .ToListAsync();

        return attendees;
    }

    private double? ExtractNumericRating(string rating)
    {
        if (double.TryParse(rating, out var numericRating))
        {
            return numericRating;
        }
        // Look for numbs
        var match = System.Text.RegularExpressions.Regex.Match(rating, @"\d+");
        if (match.Success)
        {
            if (double.TryParse(match.Value, out var extractedNumber))
            {
                return extractedNumber;
            }
        }
        return null;
    }

    public async Task<(double averageRating, int ratingCount)> GetRatings(Guid eventId)
    {
        try
        {
            var ratings = await _context.EventAttendance
                .Where(ea => ea.EventId == eventId && ea.Rating != null)
                .Select(ea => ea.Rating)
                .ToListAsync();

            var numericRatings = ratings
                .Select(r => ExtractNumericRating(r))
                .Where(r => r.HasValue)
                .Select(r => r.Value)
                .ToList();

            if (numericRatings.Count == 0)
            {
                return (0, 0);
            }

            var average = numericRatings.Average();
            var count = numericRatings.Count;

            return (average, count);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetRatings: {ex.Message}");
            throw;
        }
    }

    public async Task<EventAttendance> PutEventAttendance(EventAttendance att)
    {
        var attendance = await _context.EventAttendance
        .FirstOrDefaultAsync(x => x.UserId == att.UserId && x.EventId == att.EventId);

        if (attendance == null)
        {
            return null;
        }

        attendance.Rating = att.Rating;
        attendance.FeedBack = att.FeedBack;

        await _context.SaveChangesAsync();

        return attendance;
    }

    public async Task<bool> RemoveAttendance(Guid userId, Guid eventId)
    {
        Console.WriteLine($"UserId: {userId}, EventId: {eventId}");

        var attendance = await _context.EventAttendance
        .FirstOrDefaultAsync(a => a.UserId == userId && a.EventId == eventId);

        if (attendance == null)
        {
            Console.WriteLine("Attendance not found");
            return false;
        }

        _context.EventAttendance.Remove(attendance);
        await AssignPoints(attendance, false);

        return true;
    }
    public async Task<List<Events?>> GetEventByUserId(Guid userId)
    {
        List<Events?> eventList = new List<Events?>();
        // Get event id from EventAttendance table where userId matches
        var eventIds = await _context.EventAttendance
            .Where(a => a.UserId == userId)
            .Select(a => a.EventId)
            .ToListAsync();

        // Get event details from Events table where eventIds match
        foreach (var eventId in eventIds)
        {
            var eventObj = await _context.Events.FindAsync(eventId);
            eventList.Add(eventObj);
        }
        // return list of events
        return eventList;
    }
    public async Task<Events?> GetEventById(Guid eventId)
    {
        var eventEntity = await _context.Events.FindAsync(eventId);
        return eventEntity;
    }

    private async Task<(bool, string)> AssignPoints(EventAttendance attendance, bool addPoints = true)
    {
        // Find user
        Users? user = await _context.Users.FindAsync(attendance.UserId);
        if (user == null)
        {
            return (false, "User not found");
        }

        // Find event
        Events? _event = await _context.Events.FindAsync(attendance.EventId);
        if (_event == null)
        {
            return (false, "Event not found");
        }

        // Calculate points
        TimeSpan timeAttended = DateTime.Parse(_event.EndTime) - DateTime.Parse(_event.StartTime);
        int pointsEarned = (int)timeAttended.TotalHours * 2;

        // Add or subtract points
        int newPoints = addPoints ? user.Points + pointsEarned : user.Points - pointsEarned;
        user.Points = newPoints;

        // Save changes
        int saved = await _context.SaveChangesAsync();
        if (saved > 0)
        {
            return (true, "Points saved");
        }
        return (false, "Points not saved");

    }
}