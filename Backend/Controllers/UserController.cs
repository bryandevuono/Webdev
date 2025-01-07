using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/user")]
public class UserController : Controller
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("adduser")]
    public async Task<IActionResult> AddUser([FromBody] Users user)
    {
        if (user == null) return BadRequest(new { Message = "user should not be empty" });
        if (user.Email == null || user.Firstname == null || user.Password == null)
        {
            return BadRequest(new { Message = "Missing fields" });
        }
        if (await _userService.AddUser(user)) return Ok(new { Message = "User added" });
        return BadRequest(new { Message = "User already exists" });
    }

    [HttpGet("getuser")]
    public async Task<IActionResult> GetUser()
    {
        var user = await _userService.GetUser();
        return Ok(user);
    }

    [HttpGet("getuserbyid")]
    public async Task<IActionResult> GetUserById([FromQuery] Guid userId)
    {
        var user = await _userService.GetUserById(userId);
        if (user == null) return NotFound(new { Message = "User not found" });
        return Ok(user);
    }

    [HttpDelete("deleteuser")]
    public async Task<IActionResult> DeleteUser([FromBody] Users user)
    {
        if (user == null) return BadRequest(new { Message = "user should not be empty" });
        if (await _userService.DeleteUser(user)) return Ok(new { Message = "User deleted" });
        return NotFound(new { Message = "User not found" });
    }
}