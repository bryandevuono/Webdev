using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/login")]

public class LoginController : Controller
{
    private readonly ILoginService _loginService;

    public LoginController(ILoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost("login/admin")]
    public async Task<IActionResult> LoginAdmin([FromBody] LoginRequestAdmin loginRequest)
    {
        if (loginRequest == null) return BadRequest(new { Message = "Invalid request" });
        if (await _loginService.IsSessionActive()) return Ok(new { Message = "Admin Already logged in" });
        if (string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
        {
            return BadRequest(new { Message = "Username or password cannot be null or empty" });
        }
        if (await _loginService.LoginAsyncAdmin(loginRequest.Username, loginRequest.Password))
        {
            return Ok(new { Message = "Admin Login successful" });
        }
        return Unauthorized(new { Message = "Admin Invalid username or password" });
    }

    [HttpPost("login/user")]
    public async Task<IActionResult> LoginUser([FromBody] LoginRequestUser loginRequest)
    {
        if (loginRequest == null) return BadRequest(new { Message = "Invalid request" });
        if (await _loginService.IsSessionActive()) return Ok(new { Message = "User Already logged in" });
        if (string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
        {
            return BadRequest(new { Message = "Email or password cannot be null or empty" });
        }
        if (await _loginService.LoginAsyncUser(loginRequest.Email, loginRequest.Password))
        {
            return Ok(new { Message = "User Login successful" });
        }
        return Unauthorized(new { Message = "User Invalid username or password" });
    }

    [HttpGet("session")]
    public async Task<IActionResult> CheckSession()
    {
        if (await _loginService.IsSessionActive())
        {
            return Ok(new
            {
                IsLoggedIn = true,
                Username = _loginService.GetLoggedInUsername().Result,
                Role = _loginService.GetLoggedInUserRole().Result
            });
        }

        return Ok(new { IsLoggedIn = false });
    }
}
