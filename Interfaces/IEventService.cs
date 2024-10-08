public interface IEventService
{
    Task<IEnumerable<Events>> GetAllEvents();
    Task DeleteEvent(Guid Id);
    Task AddEvent(Events NewEvent);
    Task EditEvent(Events Event, Guid Id);
}