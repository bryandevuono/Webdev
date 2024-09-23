public interface IAuthService
{
    Task<bool> LoginAsync(string username, string password);
    bool IsSessionActive();
    string GetLoggedInUsername();
}
