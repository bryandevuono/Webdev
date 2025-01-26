using Azure;
using Microsoft.AspNetCore.Mvc;

[Route("api/ranking")]
public class RankingController : Controller
{
    private IRankingService _rankingService;
    private ILoginService _loginService;

    public RankingController(IRankingService rankingService, ILoginService loginService)
    {
        _rankingService = rankingService;
        _loginService = loginService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsersOrdered([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (page < 1 || pageSize < 1)
        {
            return BadRequest("Page and pageSize must be greater than zero.");
        }

        List<Users>? users = await _rankingService.GetUsersOrdered(page, pageSize);
        return Ok(users);
    }

    [HttpGet("totalusers")]
    public async Task<IActionResult> GetTotalUsers()
    {
        int totalUsers = await _rankingService.GetTotalUsers();
        return Ok(totalUsers);
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetPointsForUser()
    {
        Guid id = await _loginService.GetLoggedInUserId();
        Console.WriteLine(id);
        int points = await _rankingService.GetPointsForUser(id);
        return Ok(points);
    }
}