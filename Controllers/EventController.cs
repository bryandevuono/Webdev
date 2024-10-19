
using Microsoft.AspNetCore.Mvc;

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
        var Result = await _eventservice.GetById(Id);
        return Ok(Result);
    }
    [ServiceFilter(typeof(AuthenticationFilter))]
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