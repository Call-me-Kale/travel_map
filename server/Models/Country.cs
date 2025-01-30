namespace server.Models;

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


[Keyless]
    public class Country
    {
    
        public string name_pl { get; set; } = string.Empty;
        public string name_en {  get; set; } = string.Empty;
        public string code { get; set; } = string.Empty;

        public Country(string code, string name_pl, string name_en)
        {
            this.name_pl = name_pl;
            this.name_en = name_en;
            this.code = code;
        }


}

