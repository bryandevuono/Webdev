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
        var eventObj = await _attendanceService.GetEventById(eventAttendance.EventId);
        if (eventObj == null)
        {
            return NotFound("Event not found.");
        }

        var succes = await _attendanceService.AttendEvent(eventAttendance);
        if (!succes)
        {
            return BadRequest("User is already registered for this event.");
        }
        return Ok($"User {eventAttendance.UserId} is now attending event {eventAttendance.EventId}");
    }

    [HttpGet("{eventId}/attendees")]
    public async Task<IActionResult> GetAttendees(Guid eventId)
    {
        var attendees = await _attendanceService.GetAttendeesByEventId(eventId);
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

}