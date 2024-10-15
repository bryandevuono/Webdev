public interface IEventService
{
    public Task<IEnumerable<Events>> GetAllEvents();
    public Task DeleteEvent(int Id);
    public Task AddEvent(Events NewEvent);
    public Task EditEvent(Events Event, int Id);
}