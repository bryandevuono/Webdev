using Microsoft.EntityFrameworkCore;

public class RankingService : IRankingService
{
    private MyDbContext _context;

    public RankingService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<List<Users>> GetUsersOrdered()
    {
        List<Users> users = await _context.Users.ToListAsync();
        var sortedUsers = users.OrderBy(u => u.Points).ToList();
        return sortedUsers;
    }
}