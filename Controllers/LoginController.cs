using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/login")]

public class LoginController : Controller
{
    [HttpPost("login")]
    public async Task<IActionResult> Login()
    {
        return Ok();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        return Ok();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Users user)
    {
        var path = $"Json/users.json";
        var ListOfUsers = JsonSerializer.Deserialize<List<Users>>(System.IO.File.ReadAllText(path));
        if (user == null)
            return BadRequest();
        if (ListOfUsers == null)
            ListOfUsers = new List<Users>();
        if (ListOfUsers.Any(u => u.Id == user.Id))
            return BadRequest();
        ListOfUsers.Add(user);
        await System.IO.File.WriteAllTextAsync(path, JsonSerializer.Serialize(ListOfUsers));
        return Ok();
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromBody] Users user)
    {
        var path = $"Json/users.json";
        var ListOfUsers = JsonSerializer.Deserialize<List<Users>>(System.IO.File.ReadAllText(path));
        if (user == null)
            return BadRequest();
        if (ListOfUsers == null)
            ListOfUsers = new List<Users>();
        if (ListOfUsers.Count == 0)
            return NotFound();
        var userToUpdate = ListOfUsers.First(u => u.Id == user.Id);
        userToUpdate.Firstname = user.Firstname;
        userToUpdate.Lastname = user.Lastname;
        userToUpdate.Email = user.Email;
        userToUpdate.Password = user.Password;
        userToUpdate.RecurringDays = user.RecurringDays;
        await System.IO.File.WriteAllTextAsync(path, JsonSerializer.Serialize(ListOfUsers));
        return Ok();
    }

    [HttpPost("delete")]
    public async Task<IActionResult> Delete(Users user)
    {
        var path = $"Json/users.json";
        var ListOfUsers = JsonSerializer.Deserialize<List<Users>>(System.IO.File.ReadAllText(path));
        if (user == null)
            return BadRequest();
        if (ListOfUsers == null)
            ListOfUsers = new List<Users>();
        if (ListOfUsers.Count == 0)
            return NotFound();
        ListOfUsers.Remove(ListOfUsers.First(u => u.Id == user.Id));
        await System.IO.File.WriteAllTextAsync(path, JsonSerializer.Serialize(ListOfUsers));
        return Ok();
    }
}
