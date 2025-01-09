using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
public class Program
{
    public static void Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalhost3000", policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        });

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
        builder.Services.AddTransient<IRankingService, RankingService>();
        builder.Services.AddScoped<AuthenticationFilter>();
        builder.Services.AddScoped<ValidateOfficeAttendanceDateAttribute>();

        var app = builder.Build();
        app.UseSession();
        app.UseRouting();
        app.UseCors("AllowLocalhost3000");

        app.MapControllers();

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
        app.Use(async (context, next) =>
        {

            if(context.Response.StatusCode > 201)
            {
                string log = $"{DateTime.Now} | {context.Request.Path} was handled with status code {context.Response.StatusCode}\n";
                await System.IO.File.AppendAllTextAsync("./log.txt", log);
            }
            await next.Invoke();
        });
        app.Run();
    }
}
