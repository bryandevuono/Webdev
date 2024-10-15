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
        if (user == null) return BadRequest(new { Message = "Invalid request" });
        if (await _userService.AddUser(user)) return Ok(new { Message = "User added" });
        return BadRequest(new { Message = "User already exists" });
    }

    [HttpGet("getuser")]
    public async Task<IActionResult> GetUser()
    {
        var user = await _userService.GetUser();
        return Ok(user);
    }

    [HttpDelete("deleteuser")]
    public async Task<IActionResult> DeleteUser([FromBody] Users user)
    {
        if (user == null) return BadRequest(new { Message = "Invalid request" });
        if (await _userService.DeleteUser(user)) return Ok(new { Message = "User deleted" });
        return NotFound(new { Message = "User not found" });
    }
}