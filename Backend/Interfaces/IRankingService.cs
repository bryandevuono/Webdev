public interface IRankingService
{
    public Task<List<Users>> GetUsersOrdered();
    public Task<int> GetPointsForUser(Guid id);
}