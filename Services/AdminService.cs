using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

public class AdminService : IAdminService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly MyDbContext _dbContext;

    public AdminService(MyDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> AddAdmin([FromBody] Admins admin)
    {
        var adminToAdd = _dbContext.Admins.FirstOrDefault(a => a.Username == admin.Username);
        if (adminToAdd != null) return false;

        admin.Password = BCrypt.Net.BCrypt.HashPassword(admin.Password);
        _dbContext.Admins.Add(admin);
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<List<Admins>> GetAdmin()
    {
        return await _dbContext.Admins.ToListAsync();
    }

    public async Task<bool> DeleteAdmin([FromBody] Admins admin)
    {
        var adminToDelete = _dbContext.Admins.FirstOrDefault(a => a.Username == admin.Username);
        if (adminToDelete == null) return false;

        _dbContext.Admins.Remove(adminToDelete);
        await _dbContext.SaveChangesAsync();

        var loginService = new LoginService(_dbContext, _httpContextAccessor);
        if (await loginService.IsSessionActive() && await loginService.GetLoggedInUsername() == admin.Username)
        {
            await loginService.logout();
        }

        return true;
    }
}