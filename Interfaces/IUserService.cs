public interface IUserService
{
    Task<bool> AddUser(Users user);
    Task<List<Users>> GetUser();
    Task<bool> DeleteUser(Users user);
}