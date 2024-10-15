public interface IEventService
{
    public Task<IEnumerable<Events>> GetAllEvents();
    public Task DeleteEvent(Guid Id);
    public Task AddEvent(Events NewEvent);
    public Task EditEvent(Events events);
}