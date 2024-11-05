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
        var attendance = await _context.EventAttendance
        .FirstOrDefaultAsync(a => a.UserId == userId && a.EventId == eventId);

        if (attendance == null)
        {
            return false;
        }

        _context.EventAttendance.Remove(attendance);
        await _context.SaveChangesAsync();

        return true;

    }

    public async Task<Events?> GetEventById(Guid eventId)
    {
        var eventEntity = await _context.Events.FindAsync(eventId);
        return eventEntity;
    }

    private async Task<(bool, string)> AssignPoints(EventAttendance attendance)
    {
        Users user = await _context.Users.FindAsync(attendance.UserId);
        if (user == null)
        {
            return (false, "User not found");
        }

        Events _event = await _context.Events.FindAsync(attendance.EventId);
        if (_event == null)
        {
            return (false, "Event not found");
        }

        TimeSpan timeAttended = DateTime.Parse(_event.EndTime) - DateTime.Parse(_event.StartTime);

        int pointsEarned = (int)timeAttended.TotalHours * 2;
        int newPoints = user.Points + pointsEarned;
        user.Points = newPoints;

        int saved = await _context.SaveChangesAsync();

        if (saved > 0)
        {
            return (true, "Points saved");
        }
        return (false, "Points not saved");

    }
}