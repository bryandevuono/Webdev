public class Events
{
    public Guid Id {get; set; }
    public required string Title {get; set; }
    public string? Description {get; set; }
    public DateTime? Date {get; set; }
    public string? StartTime {get; set;}
    public string? EndTime {get; set; }
    public string? Location {get; set; }
    public bool? AdminAproval {get; set; }
}