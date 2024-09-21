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
        string path = $"Json/events.json";
        var ListOfEvents = _context.Events.ToList();
        await System.IO.File.WriteAllTextAsync(path, JsonSerializer.Serialize(ListOfEvents));
        return Ok();
        
    }
}