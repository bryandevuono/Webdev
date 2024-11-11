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

    public async Task<(bool, string)> AddOfficeAttendance(OfficeAttendance attendance)
    {
        if (await _loginService.IsSessionActive() == false)
        {
            return (false, "Session not active");
        }
        attendance.OfficeAttendanceId = Guid.NewGuid();
        if (attendance != null)
        {
            await _context.OfficeAttendance.AddAsync(attendance);
            (bool, string) assign = await AssignPoints(attendance);
            if (assign.Item1)
            {
                return (true, "Attendance added and points assigned");
            }
            else if (assign.Item1 == false)
            {
                return (false, "Attendance added but points not assigned");
            }
        }
        return (false, "Attendance not added");
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
            await AssignPoints(attendance, false);
            attendance.Start = updatedAttendance.Start;
            attendance.End = updatedAttendance.End;
            attendance.UserId = updatedAttendance.UserId;
            await AssignPoints(attendance);

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
            await AssignPoints(attendance, false);
            _context.OfficeAttendance.Remove(attendance);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<List<OfficeAttendance>?> GetBatchOfficeAttendances(List<Guid?> attendanceIds)
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

    public async Task<List<OfficeAttendance>?> GetOfficeAttendancesForSingleUser(Guid? userId)
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

    private async Task<(bool, string)> AssignPoints(OfficeAttendance attendance, bool addPoints = true)
    {
        // Find user
        Users? user = await _context.Users.FindAsync(attendance.UserId);
        if (user == null)
        {
            return (false, "User not found");
        }

        // Calculate points
        TimeSpan timeAttended = attendance.End - attendance.Start;
        int pointsEarned = (int)timeAttended.TotalHours;

        // Add or subtract points
        int newPoints = addPoints ? user.Points + pointsEarned : user.Points - pointsEarned;
        user.Points = newPoints;

        // Save changes
        int saved = await _context.SaveChangesAsync();
        if (saved > 0)
        {
            return (true, "Points saved");
        }
        return (false, "Points not saved");
    }
}