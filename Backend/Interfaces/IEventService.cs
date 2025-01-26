public interface IEventService
{
    public Task<IEnumerable<Events>> GetAllEvents();
    public Task<Events> GetById(Guid Id);
    public Task<bool> DeleteEvent(Guid? Id);
    public Task<bool> AddEvent(Events NewEvent);
    public Task<bool> EditEvent(Events events, Guid Id);
    public List<string?> GetReviews(Guid Id);
}