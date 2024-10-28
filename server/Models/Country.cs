namespace server.Models;
using System.ComponentModel.DataAnnotations;



    public class Country
    {
        [Key]
        public string CountryCode { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Continent {  get; set; } = string.Empty;

        public Country(string countryCode, string name, string continent)
        {
            this.CountryCode = countryCode;
            this.Name = name;
            this.Continent = continent;
        }
        

    }

