using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

public class OfficeAttendanceService : IOfficeAttendanceService
{
    private MyDbContext _context;

    public OfficeAttendanceService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<bool> AddOfficeAttendance(OfficeAttendance attendance)
    {
        attendance.OfficeAttendanceId = Guid.NewGuid();
        if (attendance != null)
        {
            await _context.OfficeAttendance.AddAsync(attendance);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> UpdateOfficeAttendance(OfficeAttendance updatedAttendance)
    {
        OfficeAttendance? attendance = await _context.OfficeAttendance.FindAsync(updatedAttendance.OfficeAttendanceId);

        if (attendance != null)
        {
            attendance.Start = updatedAttendance.Start;
            attendance.End = updatedAttendance.End;
            attendance.UserId = updatedAttendance.UserId;

            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> DeleteOfficeAttendance(Guid attendanceId)
    {
        OfficeAttendance? attendance = await _context.OfficeAttendance.FindAsync(attendanceId);
        if (attendance != null)
        {
            _context.OfficeAttendance.Remove(attendance);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<List<OfficeAttendance>> GetBatchOfficeAttendances(List<Guid?> attendanceIds)
    {
        if (attendanceIds.IsNullOrEmpty())
        {
            return await _context.OfficeAttendance.ToListAsync();
        }
        return await _context.OfficeAttendance.Where(attendance => attendanceIds.Contains(attendance.OfficeAttendanceId)).ToListAsync();
    }

    public async Task<OfficeAttendance?> GetOfficeAttendanceById(Guid attendanceId)
    {
        OfficeAttendance? attendance = await _context.OfficeAttendance.FindAsync(attendanceId);
        return attendance;
    }

    public Task<List<OfficeAttendance>>? GetOfficeAttendancesForSingleUser(Guid? userId)
    {
        if (userId == Guid.Empty)
        {
            return null;
        }
        return _context.OfficeAttendance.Where(attendance => attendance.UserId == userId).ToListAsync();
    }
}