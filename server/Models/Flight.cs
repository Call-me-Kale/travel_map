using System.ComponentModel.DataAnnotations;
namespace server.Models;

public class Flight
{
    [Key]
    public string FlightId { get; set; } = string.Empty;
    public string From { get; set; } = string.Empty;
    public string To { get; set; } = string.Empty;
    public string StartedAt {  get; set; } = string.Empty;
    public string LastedTo { get; set; } = string.Empty;

    public Flight (string id, string from, string to)
    {
        this.FlightId = id;
        this.From = from;
        this.To = to;
    }

    public Flight(string flightId, string from, string to, string startedAt, string lastedTo)
    {
        this.FlightId = flightId;
        this.From = from;
        this.To = to;
        this.StartedAt = startedAt;
        this.LastedTo = lastedTo;
    }
}
