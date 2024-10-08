public interface IAdminService
{
    Task<bool> AddAdmin(Admins admin);
    Task<List<Admins>> GetAdmin();
    Task<bool> DeleteAdmin(Admins admin);
}