using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
public class Program
{
    public static void Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<MyDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSqlConnection")));

        builder.Services.AddDistributedMemoryCache();
        builder.Services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromMinutes(30);
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
        });

        builder.Services.AddControllers();
        builder.Services.AddHttpContextAccessor();
        builder.Services.AddTransient<IEventAttService, EventAttendanceService>();
        builder.Services.AddTransient<IEventService, EventService>();
        builder.Services.AddTransient<ILoginService, LoginService>();
        builder.Services.AddTransient<IUserService, UserService>();
        builder.Services.AddTransient<IAdminService, AdminService>();
        builder.Services.AddTransient<IOfficeAttendanceService, OfficeAttendanceService>();
        builder.Services.AddScoped<AuthenticationFilter>();

        var app = builder.Build();

        app.MapControllers();

        app.UseSession();

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
        // middleware for logging
        app.Use(async (context, next) =>
        {
            string log = $"{context.Request.Path} was handled with status code {context.Response.StatusCode}";
            await System.IO.File.AppendAllTextAsync("./log.txt", log + "\n");
            await next.Invoke();
        });
        app.Run();
    }
}
