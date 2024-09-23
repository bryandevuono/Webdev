using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
    public DbSet<Users> Users { get; set; }
    public DbSet<Events> Events { get; set; }
    public DbSet<Admin> Admin { get; set; }
}