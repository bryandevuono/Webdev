public interface IEventAttService
{
    bool AttendEvent(Guid userId, Guid eventId);
    List<Users> GetAttendeesByEventId(Guid eventId);
    bool RemoveAttendance(Guid userId, Guid eventId);
}