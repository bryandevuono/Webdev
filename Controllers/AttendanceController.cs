using Microsoft.AspNetCore.Mvc;

[Route("api/attendance")]
public class AttendanceController : Controller
{
    [HttpGet("events")]
    public IActionResult GetEvents()
    {
        return Ok();
    }

    [HttpGet("events/{eventId}")]
    public IActionResult GetEvent(int eventId)
    {
        return Ok();
    }

    [HttpPost("events")]
    public IActionResult CreateEvent()
    {
        return Ok();
    }

    [HttpPut("events/{eventId}")]
    public IActionResult UpdateEvent(int eventId)
    {
        return Ok();
    }

    [HttpDelete("events/{eventId}")]
    public IActionResult DeleteEvent(int eventId)
    {
        return Ok();
    }
}