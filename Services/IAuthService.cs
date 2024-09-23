public interface IAuthService
{
    Task<bool> LoginAsync(string username, string password);
    bool IsSessionActive();
    string GetLoggedInUsername();
    void addadmin(Admin admin);
}
