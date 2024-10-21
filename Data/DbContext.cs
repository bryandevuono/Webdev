using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
    public DbSet<Users> Users { get; set; }
    public DbSet<Events> Events { get; set; }
    public DbSet<OfficeAttendance> OfficeAttendance { get; set; }
    public DbSet<Admins> Admins { get; set; }
    public DbSet<EventAttendance> Attendance { get; set; }
}