public interface ILoginService
{
    Task<bool> LoginAsync(string username, string password);
    Task<bool> IsSessionActive();
    Task<string> GetLoggedInUsername();
    Task<bool> addadmin(Admins admin);
    Task<List<Admins>> GetAdmin();
    Task<bool> DeleteAdmin(Admins admin);
}
