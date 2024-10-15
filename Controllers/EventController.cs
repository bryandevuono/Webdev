using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/events")]
public class EventController : Controller
{
    private EventService _eventservice;
    private MyDbContext _context;
    public EventController(EventService eventservice, MyDbContext context)
    {
        _eventservice=eventservice;
        _context=context;
    }

    [HttpGet("GetAllEvents")]
    public async Task<IActionResult> GetAllEvents()
    {
        var Allevents = await _eventservice.GetAllEvents();
        return Ok(Allevents);
    }

    [HttpDelete("DeleteEvent/{Id}")]
    public async Task<IActionResult> DeleteEvent(Guid? Id)
    {
        if(Id == null)
        {
            return NotFound();
        }
        var result = await _eventservice.DeleteEvent(Id);
        if(result)
        {
            return Ok("Deleted succesfully");
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPost("AddEvent")]
    public async Task<IActionResult> AddEvent([FromBody] Events NewEvent)
    {
        if(NewEvent?.Title == null) return BadRequest();
        var result = await _eventservice.AddEvent(NewEvent);
        if(result)
        {
            return Ok("Added");
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut("EditEvent")]
    public async Task<IActionResult> EditEvent([FromBody] Events NewEvent, [FromQuery]Guid Id)
    {
        if(NewEvent == null)
        {
            return BadRequest();
        }
        
        var result = await _eventservice.EditEvent(NewEvent, Id);
        if(result)
        {
            return Ok();
        }
        else
        {
            return NotFound("Id not found");
        }
    }

}