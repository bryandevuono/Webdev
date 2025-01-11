public interface IEventAttService
{
    Task<bool> AttendEvent(EventAttendance eventAttendance);
    Task<List<EventAttendance>> GetAttendeesByEventId(Guid eventId);
    Task<bool> RemoveAttendance(Guid userId, Guid eventId);
    Task<Events?> GetEventById(Guid eventId);
    Task<bool> PutEventAttendance(EventAttendance att);
}