using Microsoft.AspNetCore.Mvc;

[Route("api/officeattendance")]
public class OfficeAttendanceController : Controller
{
    private MyDbContext _context;
    private IOfficeAttendanceService _attendanceService;

    public OfficeAttendanceController(MyDbContext context, IOfficeAttendanceService attendanceService)
    {
        _context = context;
        _attendanceService = attendanceService;
    }

    [HttpPost]
    public async Task<IActionResult> AddOfficeAttendance([FromBody] OfficeAttendance attendance)
    {
        if (attendance == null) return BadRequest("Attendance object is null");
        await _attendanceService.AddOfficeAttendance(attendance);
        return Ok("Attendance added successfully");
    }

    [HttpPut("{attendanceId}")]
    public async Task<IActionResult> UpdateOfficeAttendance(Guid attendanceId)
    {
        try
        {
            await _attendanceService.UpdateOfficeAttendance(attendanceId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{attendanceId}")]
    public async Task<IActionResult> DeleteOfficeAttendance(Guid attendanceId)
    {
        try
        {
            await _attendanceService.DeleteOfficeAttendance(attendanceId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}