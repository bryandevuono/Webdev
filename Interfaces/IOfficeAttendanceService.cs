public interface IOfficeAttendanceService
{
    public Task<bool> AddOfficeAttendance(OfficeAttendance attendance);
    public Task<bool> UpdateOfficeAttendance(OfficeAttendance updatedAttendance);
    public Task<bool> DeleteOfficeAttendance(Guid attendanceId);
}