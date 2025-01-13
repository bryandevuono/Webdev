using Microsoft.AspNetCore.Mvc;

[Route("api/eventattendance")]
public class AttendanceController : Controller
{
    private readonly IEventAttService _attendanceService;

    public AttendanceController(IEventAttService attendanceService)
    {
        _attendanceService = attendanceService;
    }

    [HttpPost("attend")]
    public async Task<IActionResult> AttendEvent([FromBody] EventAttendance eventAttendance)
    {

        if (eventAttendance == null)
        {
            return BadRequest("Invalid event attendance data.");
        }

        var eventObj = await _attendanceService.GetEventById(eventAttendance.EventId);
        if (eventObj == null)
        {
            return NotFound("Event not found.");
        }

        var isAttending = await _attendanceService.IsUserAttendingEvent(eventAttendance.UserId, eventAttendance.EventId);
        if (isAttending)
        {
            return BadRequest("User is already attending this event.");
        }

        var succes = await _attendanceService.AttendEvent(eventAttendance);
        if (!succes)
        {
            return BadRequest("Failed to register user to this event.");
        }
        return Ok($"User {eventAttendance.UserId} is now attending event {eventAttendance.EventId}");
    }

    [HttpGet("isUserRegistered/{userId}/{eventId}")]
    public async Task<IActionResult> IsUserRegistered(Guid userId, Guid eventId)
    {
        var isRegistered = await _attendanceService.IsUserAttendingEvent(userId, eventId);
        if (!isRegistered)
        {
            return NotFound("User is not registered for this event.");
        }
        return Ok(isRegistered);
    }

    [HttpGet("{title}/attendees")]
    public async Task<IActionResult> GetAttendees(string title)
    {
        var attendees = await _attendanceService.GetAttendeesByEventTitle(title);
        if (attendees == null || !attendees.Any())
        {
            return NotFound("No attendees found for this event.");
        }
        return Ok(attendees);
    }

    [HttpDelete("{userId}/{eventId}")]
    public async Task<IActionResult> DeleteAttendance([FromRoute] Guid userId, [FromRoute] Guid eventId)
    {
        var succes = await _attendanceService.RemoveAttendance(userId, eventId);
        if (!succes)
        {
            return NotFound("User attendance could not be removed.");
        }

        return Ok($"User {userId} is no longer attending event {eventId}");
    }

    [HttpPut()]
    public async Task<IActionResult> PutEventAttendance([FromBody] EventAttendance attendance)
    {
        var succes = await _attendanceService.PutEventAttendance(attendance);
        if (!succes)
        {
            return NotFound("Attendance not found.");
        }
        return Ok(succes);
    }

}