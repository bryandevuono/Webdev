using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/events")]
public class EventController : Controller
{
    private EventService _eventservice;
    public EventController(EventService eventservice)
    {
        _eventservice=eventservice;
    }

    [HttpGet("GetAllEvents")]
    public async Task<IActionResult> GetAllEvents()
    {
        var Allevents = await _eventservice.GetAllEvents();
        return Ok(Allevents);
    }

    [HttpDelete("DeleteEvent/{Id}")]
    public async Task<IActionResult> DeleteEvent(int Id)
    {
        try
        {
            await _eventservice.DeleteEvent(Id);
            return Ok();
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data");
        }
    }

    [HttpPost("AddEvent")]
    public async Task<IActionResult> AddEvent([FromBody] Events NewEvent)
    {
        await _eventservice.AddEvent(NewEvent);
        return Ok();
    }

    [HttpPut("EditEvent/{Id}")]
    public async Task<IActionResult> EditEvent([FromBody] Events NewEvent, int Id)
    {
        _eventservice.EditEvent(NewEvent, Id);
        return Ok();
    }

}