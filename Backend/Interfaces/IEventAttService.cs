public interface IEventAttService
{
    Task<bool> AttendEvent(EventAttendance eventAttendance);
    Task<List<EventAttendance>> GetAttendeesByEventTitle(string title);
    Task<bool> RemoveAttendance(Guid userId, Guid eventId);
    Task<Events?> GetEventById(Guid eventId);
}