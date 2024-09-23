public class OfficeAttendanceService : IOfficeAttendanceService
{
    private MyDbContext _context;

    public OfficeAttendanceService(MyDbContext context)
    {
        _context = context;
    }

    public async Task AddOfficeAttendance(OfficeAttendance attendance)
    {
        if (attendance != null)
        {
            await _context.Attendance.AddAsync(attendance);
            await _context.SaveChangesAsync();
        }
    }

    public async Task UpdateOfficeAttendance(Guid attendanceId)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteOfficeAttendance(Guid attendanceId)
    {
        throw new NotImplementedException();
    }
}