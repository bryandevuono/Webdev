public interface IRankingService
{
    public Task<List<Users>?> GetUsersOrdered(int page, int pageSize);
    public Task<int> GetTotalUsers();
    public Task<int> GetPointsForUser(Guid id);
}