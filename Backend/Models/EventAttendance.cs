public class EventAttendance
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid EventId { get; set; }
    public DateTime AttendedOn { get; set; }

    public string? Rating { get; set; }
    public string? FeedBack { get; set; }

}