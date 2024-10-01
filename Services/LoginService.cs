using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using Webdev.Migrations;

public class LoginService : ILoginService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly MyDbContext _dbContext;

    private const string SessionKeyUsername = "LoggedInUsername";

    public LoginService(MyDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> LoginAsync(string username, string password)
    {
        var adminUser = await _dbContext.Admins
            .FirstOrDefaultAsync(admin => admin.Username == username);

        var isPasswordValid = adminUser != null && BCrypt.Net.BCrypt.Verify(password, adminUser.Password);
        if (adminUser == null || !isPasswordValid) return false;

        _httpContextAccessor.HttpContext.Session.SetString(SessionKeyUsername, username);

        return true;
    }

    public async Task<bool> IsSessionActive()
    {
        var username = _httpContextAccessor.HttpContext.Session.GetString(SessionKeyUsername);
        return !string.IsNullOrEmpty(username);
    }

    public async Task<string> GetLoggedInUsername()
    {
        return _httpContextAccessor.HttpContext.Session.GetString(SessionKeyUsername);
    }

    public async Task<bool> logout()
    {
        _httpContextAccessor.HttpContext.Session.Remove(SessionKeyUsername);
        return true;
    }

    public async Task<bool> addadmin([FromBody] Admins admin)
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

        if (await IsSessionActive() && await GetLoggedInUsername() == admin.Username)
        {
            await logout();
        }

        return true;
    }
}
