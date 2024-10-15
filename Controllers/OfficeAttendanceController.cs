using Microsoft.AspNetCore.Mvc;

[Route("api/officeattendance")]
public class OfficeAttendanceController : Controller
{
    private IOfficeAttendanceService _attendanceService;

    public OfficeAttendanceController(IOfficeAttendanceService attendanceService)
    {
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

    [HttpPut]
    public async Task<IActionResult> UpdateOfficeAttendance([FromBody] OfficeAttendance updatedAttendance)
    {
        try
        {
            await _attendanceService.UpdateOfficeAttendance(updatedAttendance);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{attendanceId}")]
    public async Task<IActionResult> DeleteOfficeAttendance([FromRoute] Guid attendanceId)
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