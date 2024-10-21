using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ValidateOfficeAttendanceDateAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ActionArguments.ContainsKey("attendance"))
        {
            var attendance = context.ActionArguments["attendance"] as OfficeAttendance;
            // check if attendance is not null
            if (attendance == null)
            {
                context.Result = new BadRequestObjectResult("Attendance is empty");
                return;
            }
            // Check if start is before end
            if (attendance.Start >= attendance.End)
            {
                context.Result = new BadRequestObjectResult("Start must be before End.");
                return;
            }
        }

        base.OnActionExecuting(context);
    }
}
