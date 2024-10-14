using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {
        
        }

        public DbSet<User> Users { get; set; }
    }
}
