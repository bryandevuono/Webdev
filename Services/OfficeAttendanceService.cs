using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

public class OfficeAttendanceService : IOfficeAttendanceService
{
    private MyDbContext _context;
    private ILoginService _loginService;

    public OfficeAttendanceService(MyDbContext context, ILoginService loginService)
    {
        _context = context;
        _loginService = loginService;
    }

    public async Task<bool> AddOfficeAttendance(OfficeAttendance attendance)
    {
        if (await _loginService.IsSessionActive() == false)
        {
            return false;
        }
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
        if (await _loginService.IsSessionActive() == false)
        {
            return false;
        }
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
        if (await _loginService.IsSessionActive() == false)
        {
            return false;
        }
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
        if (await _loginService.IsSessionActive() == false)
        {
            return null;
        }
        if (attendanceIds.IsNullOrEmpty())
        {
            return await _context.OfficeAttendance.ToListAsync();
        }
        return await _context.OfficeAttendance.Where(attendance => attendanceIds.Contains(attendance.OfficeAttendanceId)).ToListAsync();
    }

    public async Task<OfficeAttendance?> GetOfficeAttendanceById(Guid attendanceId)
    {
        if (await _loginService.IsSessionActive() == false)
        {
            return null;
        }
        OfficeAttendance? attendance = await _context.OfficeAttendance.FindAsync(attendanceId);
        return attendance;
    }

    public async Task<List<OfficeAttendance>>? GetOfficeAttendancesForSingleUser(Guid? userId)
    {
        if (await _loginService.IsSessionActive() == false)
        {
            return null;
        }
        if (userId == Guid.Empty)
        {
            return null;
        }
        return await _context.OfficeAttendance.Where(attendance => attendance.UserId == userId).ToListAsync();
    }
}