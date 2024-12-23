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
        var sortedUsers = users.OrderByDescending(u => u.Points).ToList();
        return sortedUsers;
    }

    public async Task<int> GetPointsForUser(Guid id)
    {
        Users? user = await _context.Users.FindAsync(id);
        if (user != null)
            return user.Points;
        return -1;
    }
}