

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{

    public class CountryCard
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string CountryCode { get; set; } = string.Empty;
        public string CountryName { get; set; } = string.Empty;

        public CountryCard(int UserId, string CountryCode, string CountryName)
        {
            this.UserId = UserId;
            this.CountryCode = CountryCode;
            this.CountryName = CountryName;
        }

    }

    public class CreateDto
    {
        public int UserId { get; set; }

        public string Description { get; set; } = string.Empty;
        public string CountryCode { get; set; } = string.Empty;
        public string CountryName { get; set; } = string.Empty;

    }

    public class DeleteDTO
    {
        public int UserId { get; set; }
        public string Country { get; set; } = string.Empty;
    }

}

