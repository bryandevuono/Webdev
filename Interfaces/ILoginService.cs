public interface ILoginService
{
    Task<bool> LoginAsyncAdmin(string username, string password);
    Task<bool> LoginAsyncUser(string email, string password);
    Task<bool> IsSessionActive();
    Task<string> GetLoggedInUsername();
    Task<string> GetLoggedInUserRole();
    Task<bool> addadmin(Admins admin);
    Task<List<Admins>> GetAdmin();
    Task<bool> DeleteAdmin(Admins admin);
    Task<bool> AddUser(Users user);
    Task<List<Users>> GetUser();
    Task<bool> DeleteUser(Users user);
}
