using Microsoft.AspNetCore.Mvc.Filters;
public class AuthenticationFilter : Attribute, IAsyncActionFilter
{
    public ILoginService _LoginService;
    public AuthenticationFilter(ILoginService loginService)
    {
        _LoginService = loginService;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var httpContext = context.HttpContext;
        var role = await _LoginService.GetLoggedInUserRole();
        if (role == null || role.ToString() != "admin")
        {
            httpContext.Response.StatusCode = 401;
            return;
        }
        await next();
    }
}