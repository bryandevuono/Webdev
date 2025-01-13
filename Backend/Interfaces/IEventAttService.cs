public interface IEventAttService
{
    Task<bool> AttendEvent(EventAttendance eventAttendance);
    Task<List<EventAttendance>> GetAttendeesByEventTitle(string title);
    Task<bool> RemoveAttendance(Guid userId, Guid eventId);
    Task<Events?> GetEventById(Guid eventId);
    Task<bool> IsUserAttendingEvent(Guid userId, Guid eventId);
    Task<bool> PutEventAttendance(EventAttendance att);
}