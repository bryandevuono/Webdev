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

    [HttpGet]
    public async Task<IActionResult> GetBatchOfficeAttendances([FromQuery] List<Guid?> ids)
    {
        try
        {
            List<OfficeAttendance> attendances = await _attendanceService.GetBatchOfficeAttendances(ids);
            if (attendances != null)
                return Ok(attendances);
            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBatchOfficeAttendances([FromRoute] Guid id)
    {
        try
        {
            OfficeAttendance? attendance = await _attendanceService.GetOfficeAttendanceById(id);
            if (attendance != null)
                return Ok(attendance);
            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("user/{id}")]
    public async Task<IActionResult> GetOfficeAttendancesForSingleUser([FromRoute] Guid? id)
    {
        try
        {
            List<OfficeAttendance>? attendances = await _attendanceService.GetOfficeAttendancesForSingleUser(id);
            if (attendances != null)
                return Ok(attendances);
            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}