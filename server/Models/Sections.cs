namespace server.Models
{
    public class Sections
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int OrderId { get; set; }

        public Sections() {
        
        }
    }
}
