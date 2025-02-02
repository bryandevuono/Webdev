
using Microsoft.AspNetCore.Mvc;
public readonly record struct Result(Events Event, IEnumerable<string?> Reviews);

[Route("api/events")]
public class EventController : Controller
{
    private IEventService _eventservice;
    public EventController(IEventService eventservice)
    {
        _eventservice = eventservice;
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
        if (Event == null)
        {
            return NotFound();
        }
        return Ok(result);
    }

    [HttpGet("reviews/{Id}")]
    public async Task<IActionResult> GetReviews([FromRoute] Guid Id)
    {
        var Reviews = _eventservice.GetReviews(Id);
        if (Reviews == null)
        {
            return NotFound();
        }
        return Ok(Reviews);
    }

    [ServiceFilter(typeof(AuthenticationFilter))]
    [HttpDelete("DeleteEvent/{Id}")]
    public async Task<IActionResult> DeleteEvent(Guid? Id)
    {
        if (Id == null)
        {
            return NotFound();
        }
        var result = await _eventservice.DeleteEvent(Id);
        if (result)
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
        if (NewEvent.Title == null | NewEvent.StartTime == null | NewEvent.EndTime == null | NewEvent.Description == null)
        {
            return BadRequest();
        }
        var result = await _eventservice.AddEvent(NewEvent);
        if (result)
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
    public async Task<IActionResult> EditEvent([FromBody] Events NewEvent, [FromQuery] Guid Id)
    {
        if (NewEvent.Title == null | NewEvent.StartTime == null | NewEvent.EndTime == null | NewEvent.Description == null)
        {
            return BadRequest();
        }

        var result = await _eventservice.EditEvent(NewEvent, Id);
        if (result)
        {
            return Ok();
        }
        else
        {
            return NotFound("Id not found");
        }
    }

    [HttpGet("eventreviews")]
    public async Task<IActionResult> GetEventReviews([FromQuery] Guid Id)
    {
        var Reviews = _eventservice.GetReviews(Id);
        if (Reviews == null)
        {
            return NotFound();
        }
        return Ok(Reviews);
    }

}