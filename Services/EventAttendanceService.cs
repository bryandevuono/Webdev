
public class EventAttendanceService : IEventAttService
{
    private readonly List<EventAttendance> _attendance;

    public EventAttendanceService()
    {
        _attendance = new List<EventAttendance>();
    }

    public bool AttendEvent(Guid userId, Guid eventId)
    {
        if (_attendance.Any(a => a.UserId == userId && a.EventId == eventId))
        {
            return false;
        }
        _attendance.Add(new EventAttendance { UserId = userId, EventId = eventId });
        return true;
    }

    public List<Users> GetAttendeesByEventId(Guid eventId)
    {
        return _attendance.Where(async => async.EventId == eventId).Select(async => new Users { Id = async.UserId }).ToList();
    }

    public bool RemoveAttendance(Guid userId, Guid eventId)
    {
        var attendance = _attendance.FirstOrDefault(a => a.UserId == userId && a.EventId == eventId);
        if (attendance == null)
        {
            return false;
        }
        _attendance.Remove(attendance);
        return true;

    }
}