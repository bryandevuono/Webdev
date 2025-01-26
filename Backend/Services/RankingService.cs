using System.Reflection.Metadata.Ecma335;
using Microsoft.EntityFrameworkCore;

public class RankingService : IRankingService
{
    private MyDbContext _context;

    public RankingService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<List<Users>?> GetUsersOrdered(int page, int pageSize)
    {
        // Default values if not set
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 10;

        return await _context.Users
        .OrderByDescending(u => u.Points)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    }

    public async Task<int> GetTotalUsers()
    {
        return await _context.Users.CountAsync();
    }

    public async Task<int> GetPointsForUser(Guid id)
    {
        Users? user = await _context.Users.FindAsync(id);
        if (user != null)
            return user.Points;
        return -1;
    }
}