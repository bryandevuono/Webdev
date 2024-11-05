using Microsoft.AspNetCore.Mvc;

[Route("api/ranking")]
public class RankingController : Controller
{
    private IRankingService _rankingService;

    public RankingController(IRankingService rankingService)
    {
        _rankingService = rankingService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsersOrdered()
    {
        List<Users> users = await _rankingService.GetUsersOrdered();
        return Ok(users);
    }
}