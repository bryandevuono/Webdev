using Microsoft.AspNetCore.Mvc;

[Route("api/attendance")]
public class AttendanceController : Controller
{
    private AttendanceService _attendanceService;
    private MyDbContext _context;

    public AttendanceController(MyDbContext context, AttendanceService attendanceService)
    {
        _context = context;
        _attendanceService = attendanceService;
    }

    [HttpPost]
    public async Task<IActionResult> AddAttendance([FromBody] Attendance attendance)
    {
        if (attendance == null) return BadRequest("Attendance object is null");
        await _attendanceService.AddAttendance(attendance);
        return Ok("Attendance added successfully");
    }

    [HttpPut("{attendanceId}")]
    public async Task<IActionResult> UpdateAttendance(Guid attendanceId)
    {
        return Ok();
    }

    [HttpDelete("{attendanceId}")]
    public async Task<IActionResult> DeleteAttendance(Guid attendanceId)
    {
        return Ok();
    }
}