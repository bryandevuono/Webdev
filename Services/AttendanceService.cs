public class AttendanceService : IAttendanceService
{
    private MyDbContext _context;

    public AttendanceService(MyDbContext context)
    {
        _context = context;
    }

    public async Task AddAttendance(Attendance attendance)
    {
        if (attendance != null)
        {
            await _context.Attendance.AddAsync(attendance);
            await _context.SaveChangesAsync();
        }
    }

    public async Task UpdateAttendance(Guid attendanceId)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAttendance(Guid attendanceId)
    {
        throw new NotImplementedException();
    }
}