public interface IUserService
{
    public Task<bool> AddUser(Users user);
    public Task<List<Users>> GetUser();
    public Task<bool> DeleteUser(Users user);
}