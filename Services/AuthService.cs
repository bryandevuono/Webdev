using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class AuthService : IAuthService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly MyDbContext _dbContext;

    // var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
    // var isPasswordValid = BCrypt.Net.BCrypt.Verify(password, hashedPassword);

    private const string SessionKeyUsername = "LoggedInUsername";

    public AuthService(MyDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> LoginAsync(string username, string password)
    {
        var adminUser = await _dbContext.Admins
            .FirstOrDefaultAsync(admin => admin.Username == username);

        if (adminUser == null || adminUser.Password != password)
        {
            return false;
        }

        _httpContextAccessor.HttpContext.Session.SetString(SessionKeyUsername, username);

        return true;
    }

    public bool IsSessionActive()
    {
        var username = _httpContextAccessor.HttpContext.Session.GetString(SessionKeyUsername);
        return !string.IsNullOrEmpty(username);
    }

    public string GetLoggedInUsername()
    {
        return _httpContextAccessor.HttpContext.Session.GetString(SessionKeyUsername);
    }

    public bool addadmin([FromBody] Admins admin)
    {
        var adminToAdd = _dbContext.Admins.FirstOrDefault(a => a.Username == admin.Username);
        if (adminToAdd != null) return false;

        _dbContext.Admins.Add(admin);
        _dbContext.SaveChanges();

        return true;
    }

    public List<Admins> GetAdmin()
    {
        var admin = _dbContext.Admins.ToList();
        return admin;
    }

    public bool DeleteAdmin([FromBody] Admins admin)
    {
        var adminToDelete = _dbContext.Admins.FirstOrDefault(a => a.Username == admin.Username);
        if (adminToDelete == null) return false;

        _dbContext.Admins.Remove(adminToDelete);
        _dbContext.SaveChanges();

        return true;
    }
}
