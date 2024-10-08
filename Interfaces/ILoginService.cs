public interface IAuthService
{
    Task<bool> LoginAsync(string username, string password);
    bool IsSessionActive();
    string GetLoggedInUsername();
    bool addadmin(Admins admin);
    List<Admins> GetAdmin();
    bool DeleteAdmin(Admins admin);
}
