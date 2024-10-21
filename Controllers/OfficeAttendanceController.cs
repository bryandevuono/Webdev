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
    [ValidateOfficeAttendanceDate]
    public async Task<IActionResult> AddOfficeAttendance([FromBody] OfficeAttendance attendance)
    {
        try
        {
            if (await _attendanceService.AddOfficeAttendance(attendance))
                return Ok();
            return BadRequest("OfficeAttendance could not be added.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [ValidateOfficeAttendanceDate]
    public async Task<IActionResult> UpdateOfficeAttendance([FromBody] OfficeAttendance attendance)
    {
        try
        {
            if (await _attendanceService.UpdateOfficeAttendance(attendance))
                return Ok();
            return BadRequest("OfficeAttendance could not be updated.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{attendanceid}")]
    public async Task<IActionResult> DeleteOfficeAttendance([FromRoute] Guid attendanceId)
    {
        try
        {
            if (await _attendanceService.DeleteOfficeAttendance(attendanceId))
                return Ok();
            return BadRequest("OfficeAttendance could not be deleted.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}