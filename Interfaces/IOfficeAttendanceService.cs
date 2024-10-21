public interface IOfficeAttendanceService
{
    public Task<bool> AddOfficeAttendance(OfficeAttendance attendance);
    public Task<bool> UpdateOfficeAttendance(OfficeAttendance updatedAttendance);
    public Task<bool> DeleteOfficeAttendance(Guid attendanceId);
    public Task<List<OfficeAttendance>> GetBatchOfficeAttendances(List<Guid?> attendanceIds);
    public Task<OfficeAttendance?> GetOfficeAttendanceById(Guid attendanceId);
    public Task<List<OfficeAttendance>>? GetOfficeAttendancesForSingleUser(Guid? userId);
}