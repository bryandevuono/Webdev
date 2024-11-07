using Microsoft.EntityFrameworkCore;
public class EventService: IEventService
{
    public MyDbContext _context;
    
    public EventService(MyDbContext context)
    {
        _context=context;
    }

    public async Task<IEnumerable<Events>> GetAllEvents() =>
        await _context.Events.ToListAsync();
    
    public async Task<Events?> GetById(Guid Id)
    {
        var Event = await _context.Events.FindAsync(Id);
        return Event;
    }
    public async Task<bool> DeleteEvent(Guid? Id)
    {
        var Event = _context.Events.SingleOrDefault(_ => _.Id == Id);
        if(Event == null)
        {
            return false;
        }
        _context.Events.Remove(Event);
        int changes = await _context.SaveChangesAsync();
        if(changes>0)
        {
            return true;
        }
        return false;
    }

    public async Task<bool> AddEvent(Events _event)
    {
        await _context.Events.AddAsync(_event);
        int changes = await _context.SaveChangesAsync();
        if(changes>0)
        {
            return true;
        }
        return false;
    }

    public async Task<bool> EditEvent(Events _event, Guid Id)
    {
        var ToEditEvent = await _context.Events.FindAsync(Id);
    	if(ToEditEvent == null)
        {
            return false;
        }
        ToEditEvent.Title=_event.Title;
        ToEditEvent.Description = _event.Description;
        ToEditEvent.Date = _event.Date;
        ToEditEvent.StartTime = _event.StartTime;
        ToEditEvent.EndTime = _event.EndTime;
        ToEditEvent.Location = _event.Location;
        ToEditEvent.AdminAproval = _event.AdminAproval;
        
        int changes = await _context.SaveChangesAsync();
        if(changes>0)
        {
            return true;
        }
        else
        {
            return false;

        }
    }

    public IEnumerable<string?> GetReviews(Guid Id)
    {
        var result = _context.EventAttendance.Where(_=>Id == _.EventId).ToList();
        List<string?> Reviews = new List<string?>(); 
        foreach(var review in result)
        {
            Reviews.Add(review.Rating + ": " + review.FeedBack);
        }
        return Reviews;
    }
}