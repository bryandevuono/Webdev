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
    public async Task<IActionResult> DeleteEvent(Guid Id)
    {
        if(_context.Events.SingleOrDefault(u => u.Id == Id) == null) return NotFound();
        await _eventservice.DeleteEvent(Id);
        return Ok();
    }

    [HttpPost("AddEvent")]
    public async Task<IActionResult> AddEvent([FromBody] Events NewEvent)
    {
        if(NewEvent == null) return BadRequest();
        await _eventservice.AddEvent(NewEvent);
        return Ok();
    }

    [HttpPut("EditEvent/{Id}")]
    public async Task<IActionResult> EditEvent([FromBody] Events NewEvent)
    {
        if(_context.Events.SingleOrDefault(u => u.Id == NewEvent.Id) == null) return NotFound();
        if(NewEvent == null) return BadRequest();
        await _eventservice.EditEvent(NewEvent);
        return Ok();
    }

}