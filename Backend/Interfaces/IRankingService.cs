public interface IRankingService
{
    public Task<List<Users>> GetUsersOrdered();
}