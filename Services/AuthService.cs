using Microsoft.EntityFrameworkCore;

public class AuthService : IAuthService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly MyDbContext _dbContext;

    private const string SessionKeyUsername = "LoggedInUsername";

    public AuthService(MyDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> LoginAsync(string username, string password)
    {
        var adminUser = await _dbContext.Users
            .FirstOrDefaultAsync(user => user.Username == username);

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
}
