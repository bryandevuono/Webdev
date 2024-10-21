using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
public class AttendanceController : Controller
{
    private readonly MyDbContext _context;
    private readonly IEventAttService _attendanceService;

    public AttendanceController(MyDbContext context, IEventAttService attendanceService)
    {
        _context = context;
        _attendanceService = attendanceService;
    }

    [HttpPost("attend")]
    public IActionResult AttendEvent([FromBody] EventAttendance eventAttendance)
    {
        var eventObj = _context.Events.FirstOrDefault(e => e.Id == eventAttendance.EventId);
        if (eventObj == null)
        {
            return NotFound("Event not found.");
        }
        if (eventObj.Date < DateTime.Now)
        {
            return BadRequest();
        }
        var succes = _attendanceService.AttendEvent(eventAttendance.UserId, eventAttendance.EventId);
        if (!succes)
        {
            return BadRequest("User is already registered for this event.");
        }
        return Ok($"User {eventAttendance.UserId} is now attending event {eventAttendance.EventId}");
    }

    [HttpGet("{eventId}/attendees")]
    public IActionResult GetAttendees(Guid eventId)
    {
        var attendees = _attendanceService.GetAttendeesByEventId(eventId);
        if (attendees == null || !attendees.Any())
        {
            return NotFound("No attendees found for this event.");
        }
        return Ok(attendees);
    }

    [HttpDelete("delete/{UserId}")]
    public IActionResult DeleteAttendance([FromBody] EventAttendance eventAttendance)
    {
        var succes = _attendanceService.RemoveAttendance(eventAttendance.UserId, eventAttendance.EventId);
        if (!succes)
        {
            return BadRequest("User attendance could not be removed.");
        }

        return Ok($"User {eventAttendance.UserId} is no longer attending event {eventAttendance.EventId}");
    }

}