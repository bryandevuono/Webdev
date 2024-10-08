public interface IOfficeAttendanceService
{
    public Task AddOfficeAttendance(OfficeAttendance attendance);
    public Task UpdateOfficeAttendance(OfficeAttendance updatedAttendance);
    public Task DeleteOfficeAttendance(Guid attendanceId);
}