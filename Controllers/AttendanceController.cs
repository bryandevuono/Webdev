using Microsoft.AspNetCore.Mvc;

[Route("api/officeattendance")]
public class OfficeAttendanceController : Controller
{
    private IOfficeAttendanceService _attendanceService;
    private MyDbContext _context;

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
        return Ok();
    }

    [HttpDelete("{attendanceId}")]
    public async Task<IActionResult> DeleteOfficeAttendance(Guid attendanceId)
    {
        return Ok();
    }
}