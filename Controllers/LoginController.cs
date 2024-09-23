using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/login")]

public class AuthController : Controller
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestAdmin loginRequest)
    {
        if (await _authService.LoginAsync(loginRequest.Username, loginRequest.Password))
        {
            return Ok(new { Message = "Login successful" });
        }

        return Unauthorized(new { Message = "Invalid username or password" });
    }

    [HttpGet("session")]
    public IActionResult CheckSession()
    {
        if (_authService.IsSessionActive())
        {
            return Ok(new
            {
                IsLoggedIn = true,
                Username = _authService.GetLoggedInUsername()
            });
        }

        return Ok(new { IsLoggedIn = false });
    }

    [HttpPost("addadmin")]
    public IActionResult AddAdmin([FromBody] Admin admin)
    {
        _authService.addadmin(admin);
        return Ok(new { Message = "Admin added" });
    }
}
