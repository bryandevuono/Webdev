public interface IEventAttService
{
    Task<bool> AttendEvent(Guid userId, Guid eventId);
    Task<List<Users>> GetAttendeesByEventId(Guid eventId);
    Task<bool> RemoveAttendance(Guid userId, Guid eventId);
    Task<Events?> GetEventById(Guid eventId);
}