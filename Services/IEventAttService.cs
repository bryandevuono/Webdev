public interface IEventAttService
{
    bool AttendEvent(int userId, int eventId);
    List<Users> GetAttendeesByEventId(int eventId);
    bool RemoveAttendance(int userId, int eventId);
}