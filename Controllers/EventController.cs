using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/events")]
public class EventController : Controller
{
    private MyDbContext _context;
    public EventController(MyDbContext context)
    {
        _context = context;
    }

    [HttpGet("GetAllEvents")]
    public async Task<IActionResult> GetAllEvents()
    {
        var ListOfEvents = _context.Events.ToList();
        return Ok(ListOfEvents);
        
    }

    [HttpDelete("DeleteEvent/{Id}")]
    public async Task<IActionResult> DeleteEvent(int Id)
    {
        var Event = _context.Events.SingleOrDefault(u => u.Id == Id);
        if(Event != null)
        {
            _context.Events.Remove(Event);
            _context.SaveChanges();
            return Ok();
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPut("AddEvent")]
    public async Task<IActionResult> AddEvent([FromBody] Events NewEvent)
    {
        if(NewEvent != null)
        {
            _context.Events.AddAsync(NewEvent);
            _context.SaveChanges();
            return Ok();
        }
        else
        {
            return StatusCode(500, "Failed");
        }
    }
}