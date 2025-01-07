public interface IUserService
{
    public Task<bool> AddUser(Users user);
    public Task<List<Users>> GetUser();
    public Task<Users> GetUserById(Guid userId);
    public Task<bool> DeleteUser(Users user);
}