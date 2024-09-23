public class OfficeAttendance
{
    public int? Id {get; set;}
    public DateTime? Start { get; set; }
    public DateTime? End { get; set; }
    public Guid? UserId { get; set; }
    public Guid? EventId { get; set; }
}