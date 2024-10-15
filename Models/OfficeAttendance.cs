public class OfficeAttendance
{
    public Guid OfficeAttendanceId { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public Guid UserId { get; set; }
}