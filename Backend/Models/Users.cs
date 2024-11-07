public class Users
{
    public Guid Id { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string? Email { get; set; }
    public string Password { get; set; }
    public int RecurringDays { get; set; }
    public int Points { get; set; }
}

public class LoginRequestUser
{
    public string Email { get; set; }
    public string Password { get; set; }
}