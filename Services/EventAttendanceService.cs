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
        await _context.SaveChangesAsync();

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
        return await _context.Events.FindAsync(eventId);
    }
}