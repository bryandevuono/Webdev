public interface IEventService
{
    Task<IEnumerable<Events>> GetAllEvents();
    Task DeleteEvent(int Id);
    Task AddEvent(Events NewEvent);
    Task EditEvent(Events Event, int Id);
}