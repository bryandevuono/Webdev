using Npgsql.EntityFrameworkCore.PostgreSQL;
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
    
    public async Task DeleteEvent(Guid Id)
    {
        var Event = _context.Events.SingleOrDefault(u => u.Id == Id);
        if(Event != null)
        {
            _context.Events.Remove(Event);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AddEvent(Events _event)
    {
        if(_event != null)
        {
            await _context.Events.AddAsync(_event);
            await _context.SaveChangesAsync();
        }
    }

    public async Task EditEvent(Events _event)
    {
        var ToEditEvent = _context.Events.SingleOrDefault(u => u.Id == _event.Id);
        if(ToEditEvent != null)
        {
            ToEditEvent.Title=_event.Title;
            ToEditEvent.Description = _event.Description;
            ToEditEvent.Date = _event.Date;
            ToEditEvent.StartTime = _event.StartTime;
            ToEditEvent.EndTime = _event.EndTime;
            ToEditEvent.Location = _event.Location;
            ToEditEvent.AdminAproval = _event.AdminAproval;
            await _context.SaveChangesAsync();
        }
    }
}