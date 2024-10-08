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

    [HttpPost("adduser")]
    public async Task<IActionResult> AddUser([FromBody] Users user)
    {
        if (await _loginService.AddUser(user)) return Ok(new { Message = "User added" });
        return BadRequest(new { Message = "User already exists" });
    }

    [HttpGet("getuser")]
    public async Task<IActionResult> GetUser()
    {
        var user = await _loginService.GetUser();
        return Ok(user);
    }

    [HttpPost("deleteuser")]
    public async Task<IActionResult> DeleteUser([FromBody] Users user)
    {
        if (await _loginService.DeleteUser(user)) return Ok(new { Message = "User deleted" });
        return NotFound(new { Message = "User not found" });
    }
}
