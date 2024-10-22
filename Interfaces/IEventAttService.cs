public interface IEventAttService
{
    Task<bool> AttendEvent(EventAttendance eventAttendance);
    Task<List<Users>> GetAttendeesByEventId(Guid eventId);
    Task<bool> RemoveAttendance(Guid userId, Guid eventId);
    Task<List<Events?>> GetEventByUserId(Guid eventId);
    Task<Events?> GetEventById(Guid eventId);
}