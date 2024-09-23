public interface IAttendanceService
{
    public Task GetAttendance();
    public Task GetEventAttendance(int eventId);
    public Task GetUserAttendance(int personId);
    public Task AddAttendance(bool isAttending);
    public Task UpdateAttendance(bool isAttending);
    public Task DeleteAttendance();
}