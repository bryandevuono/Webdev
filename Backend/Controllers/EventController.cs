
using Microsoft.AspNetCore.Mvc;
public readonly record struct Result(Events Event, IEnumerable<string?> Reviews);

[Route("api/events")]
public class EventController : Controller
{
    private IEventService _eventservice;
    public EventController(IEventService eventservice)
    {
        _eventservice=eventservice;
    }

    [HttpGet("GetAllEvents")]
    public async Task<IActionResult> GetAllEvents()
    {
        var Allevents = await _eventservice.GetAllEvents();
        return Ok(Allevents);
    }
    [HttpGet()]
    public async Task<IActionResult> GetEventById([FromQuery] Guid Id)
    {
        var Event = await _eventservice.GetById(Id);
        var Reviews = _eventservice.GetReviews(Id);
        Result result = new Result(Event, Reviews);
        if(Event == null)
        {
            return NotFound();
        }
        return Ok(result);
    }

    [ServiceFilter(typeof(AuthenticationFilter))]
    [HttpDelete("DeleteEvent/{Title}")]
    public async Task<IActionResult> DeleteEvent(string Title)
    {
        if(Title == null)
        {
            return NotFound();
        }
        var result = await _eventservice.DeleteEvent(Title);
        if(result)
        {
            return Ok("Deleted succesfully");
        }
        else
        {
            return BadRequest();
        }
    }
    
    [ServiceFilter(typeof(AuthenticationFilter))]
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

    [ServiceFilter(typeof(AuthenticationFilter))]
    [HttpPut("EditEvent")]
    public async Task<IActionResult> EditEvent([FromBody] Events NewEvent, [FromQuery]string Title)
    {
        if(NewEvent == null)
        {
            return BadRequest();
        }
        
        var result = await _eventservice.EditEvent(NewEvent, Title);
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