public interface IAttendanceService
{
    public Task AddAttendance(Attendance attendance);
    public Task UpdateAttendance(Guid attendanceId);
    public Task DeleteAttendance(Guid attendanceId);
}