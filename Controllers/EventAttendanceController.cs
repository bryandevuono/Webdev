using Microsoft.AspNetCore.Mvc;

[Route("api/attendance")]
public class AttendanceController : Controller
{
    private readonly IEventService _eventService;
    private readonly IEventAttService _attendanceService;

    public AttendanceController(IEventService eventService, IEventAttService attendanceService)
    {
        _eventService = eventService;
        _attendanceService = attendanceService;
    }

    [HttpPost("attend")]
    public IActionResult AttendEvent()
    {
        return Ok();
    }

    [HttpGet("events/{eventId}/attendees")]
    public IActionResult GetAttendees(int eventId)
    {
        var attendees = _attendanceService.GetAttendeesByEventId(eventId);
        if (attendees == null || !attendees.Any())
        {
            return NotFound("No attendees found for this event.");
        }
        return Ok(attendees);
    }

    public IActionResult DeleteAttendance()
    {
        return Ok();
    }

}