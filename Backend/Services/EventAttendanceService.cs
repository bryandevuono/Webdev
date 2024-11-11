using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
public class EventAttendanceService : IEventAttService
{
    private readonly MyDbContext _context;

    public EventAttendanceService(MyDbContext context)
    {
        _context = context;
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

    public async Task<List<Users>> GetAttendeesByEventId(Guid eventId)
    {
        return await _context.EventAttendance
            .Where(a => a.EventId == eventId)
            .Select(a => new Users { Id = a.UserId })
            .ToListAsync();
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