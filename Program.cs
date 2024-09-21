using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configure PostgreSQL database
        builder.Services.AddDbContext<MyDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSqlConnection")));

        // Add other services like controllers, etc.
        builder.Services.AddControllers();

        var app = builder.Build();

        // Add middleware, routing, etc.
        app.MapControllers();

        app.Run();
    }
}