public interface IEventService
{
    public Task<IEnumerable<Events>> GetAllEvents();
    public Task<Events> GetById(Guid Id);
    public Task<bool> DeleteEvent(string? Id);
    public Task<bool> AddEvent(Events NewEvent);
    public Task<bool> EditEvent(Events events, string _title);
    public IEnumerable<string?> GetReviews(Guid Id);
}