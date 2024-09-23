using Microsoft.AspNetCore.Mvc;

[Route("api/attendance")]
public class AttendanceController : Controller
{
    [HttpGet("events")]
    public async Task<IActionResult> GetEvents()
    {
        return Ok();
    }

    [HttpGet("events/{eventId}")]
    public async Task<IActionResult> GetEvent(int eventId)
    {
        return Ok();
    }

    [HttpPost("events")]
    public async Task<IActionResult> CreateEvent()
    {
        return Ok();
    }

    [HttpPut("events/{eventId}")]
    public async Task<IActionResult> UpdateEvent(int eventId)
    {
        return Ok();
    }

    [HttpDelete("events/{eventId}")]
    public async Task<IActionResult> DeleteEvent(int eventId)
    {
        return Ok();
    }
}