using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

public class LoginService : ILoginService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly MyDbContext _dbContext;

    private const string SessionKeyUsername = "LoggedInUsername";
    private const string SessionKeyRole = "LoggedInRole";
    private const string SessionKeyUserId = "LoggedInUserId";

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
        httpContext.Session.SetString(SessionKeyUserId, admin.Id.ToString());

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
        httpContext.Session.SetString(SessionKeyUserId, user.Id.ToString());

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

public async Task<Guid> GetLoggedInUserId()
{
    var userId = _httpContextAccessor.HttpContext.Session.GetString(SessionKeyUserId);

    if (string.IsNullOrEmpty(userId))
    {
        throw new InvalidOperationException("User ID is not found in the session.");
    }

    if (!Guid.TryParse(userId, out var parsedUserId))
    {
        throw new FormatException("The User ID in the session is not a valid GUID.");
    }

    return parsedUserId;
}


    public async Task<bool> Logout()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return false;
        httpContext.Session.Remove(SessionKeyRole);
        httpContext.Session.Remove(SessionKeyUsername);
        httpContext.Session.Remove(SessionKeyUserId);
        return true;
    }
}
