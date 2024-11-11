using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[Route("api/admin")]
public class AdminController : Controller
{
    private readonly IAdminService _adminService;
    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("addadmin")]
    public async Task<IActionResult> AddAdmin([FromBody] Admins admin)
    {
        if (admin == null) return BadRequest(new { Message = "admin should not be empty" });
        if (await _adminService.AddAdmin(admin)) return Ok(new { Message = "Admin added" });
        return BadRequest(new { Message = "Admin already exists" });
    }

    [HttpGet("getadmin")]
    public async Task<IActionResult> GetAdmin()
    {
        var admin = await _adminService.GetAdmin();
        return Ok(admin);
    }

    [HttpDelete("deleteadmin")]
    public async Task<IActionResult> DeleteAdmin([FromBody] Admins admin)
    {
        if (admin == null) return BadRequest(new { Message = "admin should not be empty" });
        if (await _adminService.DeleteAdmin(admin)) return Ok(new { Message = "Admin deleted" });
        return NotFound(new { Message = "Admin not found" });
    }
}