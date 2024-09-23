public interface IOfficeAttendanceService
{
    public Task AddOfficeAttendance(OfficeAttendance attendance);
    public Task UpdateOfficeAttendance(Guid attendanceId);
    public Task DeleteOfficeAttendance(Guid attendanceId);
}