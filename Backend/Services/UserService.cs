using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

public class UserService : IUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly MyDbContext _dbContext;

    public UserService(MyDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
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

        var loginService = new LoginService(_dbContext, _httpContextAccessor);
        if (await loginService.IsSessionActive() && await loginService.GetLoggedInUsername() == user.Email)
        {
            await loginService.Logout();
        }

        return true;
    }
}