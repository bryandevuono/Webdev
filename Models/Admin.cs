public class Admin
{
    public int? Id { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }
}

public class LoginRequestAdmin
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}