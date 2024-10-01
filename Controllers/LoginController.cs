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
        if (_authService.IsSessionActive()) return Ok(new { Message = "Already logged in" });
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
    public IActionResult AddAdmin([FromBody] Admins admin)
    {
        if (_authService.addadmin(admin)) return Ok(new { Message = "Admin added" });
        return BadRequest(new { Message = "Admin already exists" });
    }

    [HttpGet("getadmin")]
    public IActionResult GetAdmin()
    {
        var admin = _authService.GetAdmin();
        return Ok(admin);
    }

    [HttpPost("deleteadmin")]
    public IActionResult DeleteAdmin([FromBody] Admins admin)
    {
        if (_authService.DeleteAdmin(admin)) return Ok(new { Message = "Admin deleted" });
        return NotFound(new { Message = "Admin not found" });
    }
}
