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
        try
        {
            await _attendanceService.AddOfficeAttendance(attendance);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
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