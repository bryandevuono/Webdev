using Microsoft.EntityFrameworkCore;
public class EventAttendanceService : IEventAttService
{
    private readonly MyDbContext _context;

    public EventAttendanceService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<bool> AttendEvent(Guid userId, Guid eventId)
    {
        var alreadyAttending = await _context.Attendance
        .AnyAsync(a => a.UserId == userId && a.EventId == eventId);
        if (alreadyAttending)
        {
            return false;
        }
        var eventAttendance = new EventAttendance { UserId = userId, EventId = eventId };
        _context.Attendance.Add(eventAttendance);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<Users>> GetAttendeesByEventId(Guid eventId)
    {
        return await _context.Attendance
            .Where(a => a.EventId == eventId)
            .Select(a => new Users { Id = a.UserId })
            .ToListAsync();
    }

    public async Task<bool> RemoveAttendance(Guid userId, Guid eventId)
    {
        var attendance = await _context.Attendance
        .FirstOrDefaultAsync(a => a.UserId == userId && a.EventId == eventId);

        if (attendance == null)
        {
            return false;
        }

        _context.Attendance.Remove(attendance);
        await _context.SaveChangesAsync();
        
        return true;

    }

    public async Task<Events> GetEventById(Guid eventId)
    {
        var eventEntity = await _context.Events.FindAsync(eventId);
        if (eventEntity == null)
        {
            throw new ArgumentException($"Event with ID {eventId} not found.");
        }
        return eventEntity;
    }
}