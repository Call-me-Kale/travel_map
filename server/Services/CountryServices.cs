using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class CountryService
    {
        private readonly ApiDbContext _context;

        public CountryService(ApiDbContext context)
        {
            _context = context;
        }
        public async Task<Dictionary<string, (string NamePL, string NameEN)>> GetCountriesDictionaryAsync()
        {
            var countries = await _context.Countries
                .AsNoTracking()
                .ToListAsync();

            return countries.ToDictionary(
                c => c.code,
                c => (c.name_pl, c.name_en)
            );
        }
    }
}
