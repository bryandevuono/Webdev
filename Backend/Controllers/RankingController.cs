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
    public async Task<IActionResult> GetUsersOrdered()
    {
        List<Users> users = await _rankingService.GetUsersOrdered();
        return Ok(users);
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