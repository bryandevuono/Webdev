public class OfficeAttendanceService : IOfficeAttendanceService
{
    private MyDbContext _context;

    public OfficeAttendanceService(MyDbContext context)
    {
        _context = context;
    }

    public async Task AddOfficeAttendance(OfficeAttendance attendance)
    {
        attendance.OfficeAttendanceId = Guid.NewGuid();
        if (attendance != null)
        {
            await _context.OfficeAttendance.AddAsync(attendance);
            await _context.SaveChangesAsync();
        }
    }

    public async Task UpdateOfficeAttendance(OfficeAttendance updatedAttendance)
    {
        OfficeAttendance attendance = await _context.OfficeAttendance.FindAsync(updatedAttendance.OfficeAttendanceId);

        if (attendance != null)
        {
            attendance.Start = updatedAttendance.Start;
            attendance.End = updatedAttendance.End;
            attendance.UserId = updatedAttendance.UserId;

            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteOfficeAttendance(Guid attendanceId)
    {
        OfficeAttendance attendance = await _context.OfficeAttendance.FindAsync(attendanceId);
        if (attendance != null)
        {
            _context.OfficeAttendance.Remove(attendance);
            await _context.SaveChangesAsync();
        }
    }
}