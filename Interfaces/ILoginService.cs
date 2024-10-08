public interface ILoginService
{
    Task<bool> LoginAsyncAdmin(string username, string password);
    Task<bool> LoginAsyncUser(string email, string password);
    Task<bool> IsSessionActive();
    Task<string> GetLoggedInUsername();
    Task<string> GetLoggedInUserRole();
}
