using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

public class LoginService : ILoginService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly MyDbContext _dbContext;

    private const string SessionKeyUsername = "LoggedInUsername";
    private const string SessionKeyRole = "LoggedInRole";

    public LoginService(MyDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> LoginAsyncAdmin(string username, string password)
    {
        var admin = await _dbContext.Admins
            .FirstOrDefaultAsync(admin => admin.Username == username);

        var isPasswordValid = admin != null && BCrypt.Net.BCrypt.Verify(password, admin.Password);
        if (admin == null || !isPasswordValid) return false;

        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return false;

        httpContext.Session.SetString(SessionKeyUsername, username);
        httpContext.Session.SetString(SessionKeyRole, "admin");

        return true;
    }

    public async Task<bool> LoginAsyncUser(string email, string password)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(user => user.Email == email);

        var isPasswordValid = user != null && BCrypt.Net.BCrypt.Verify(password, user.Password);
        if (user == null || !isPasswordValid) return false;

        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return false;
        httpContext.Session.SetString(SessionKeyUsername, email);
        httpContext.Session.SetString(SessionKeyRole, "user");

        return true;
    }

    public async Task<bool> IsSessionActive()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return false;
        var username = httpContext.Session.GetString(SessionKeyUsername);
        var role = httpContext.Session.GetString(SessionKeyRole);
        return !string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(role);
    }

    public async Task<string> GetLoggedInUsername()
    {
        return _httpContextAccessor.HttpContext.Session.GetString(SessionKeyUsername);
    }

    public async Task<string> GetLoggedInUserRole()
    {
        return _httpContextAccessor.HttpContext.Session.GetString(SessionKeyRole);
    }

    public async Task<bool> logout()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return false;
        httpContext.Session.Remove(SessionKeyRole);
        httpContext.Session.Remove(SessionKeyUsername);
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

    public async Task<bool> AddUser([FromBody] Users user)
    {
        var userToAdd = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
        if (userToAdd != null) return false;

        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<List<Users>> GetUser()
    {
        return await _dbContext.Users.ToListAsync();
    }

    public async Task<bool> DeleteUser([FromBody] Users user)
    {
        var userToDelete = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
        if (userToDelete == null) return false;

        _dbContext.Users.Remove(userToDelete);
        await _dbContext.SaveChangesAsync();

        if (await IsSessionActive() && await GetLoggedInUsername() == user.Email)
        {
            await logout();
        }

        return true;
    }
}
