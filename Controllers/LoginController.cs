using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/login")]

public class AuthController : Controller
{
    private readonly ILoginService _loginService;

    public AuthController(ILoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestAdmin loginRequest)
    {
        if (loginRequest == null) return BadRequest(new { Message = "Invalid request" });
        if (await _loginService.IsSessionActive()) return Ok(new { Message = "Already logged in" });
        if (await _loginService.LoginAsync(loginRequest.Username, loginRequest.Password))
        {
            return Ok(new { Message = "Login successful" });
        }
        return Unauthorized(new { Message = "Invalid username or password" });
    }

    [HttpGet("session")]
    public async Task<IActionResult> CheckSession()
    {
        if (await _loginService.IsSessionActive())
        {
            return Ok(new
            {
                IsLoggedIn = true,
                Username = _loginService.GetLoggedInUsername()
            });
        }

        return Ok(new { IsLoggedIn = false });
    }

    [HttpPost("addadmin")]
    public async Task<IActionResult> AddAdmin([FromBody] Admins admin)
    {
        if (await _loginService.addadmin(admin)) return Ok(new { Message = "Admin added" });
        return BadRequest(new { Message = "Admin already exists" });
    }

    [HttpGet("getadmin")]
    public async Task<IActionResult> GetAdmin()
    {
        var admin = await _loginService.GetAdmin();
        return Ok(admin);
    }

    [HttpPost("deleteadmin")]
    public async Task<IActionResult> DeleteAdmin([FromBody] Admins admin)
    {
        if (await _loginService.DeleteAdmin(admin)) return Ok(new { Message = "Admin deleted" });
        return NotFound(new { Message = "Admin not found" });
    }
}
