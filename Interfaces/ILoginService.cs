public interface ILoginService
{
    public Task<bool> LoginAsyncAdmin(string username, string password);
    public Task<bool> LoginAsyncUser(string email, string password);
    public Task<bool> IsSessionActive();
    public Task<string> GetLoggedInUsername();
    public Task<string> GetLoggedInUserRole();
}
