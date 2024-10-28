using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using System.Text;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersControllers : ControllerBase
    {
        private readonly ApiDbContext _context;

        public UsersControllers(ApiDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetByEmail(string email)
        { 
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] server.Models.LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("All fields (Email, and Password) are required.");
            }

            var isEmailInUse = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (isEmailInUse == null)
            {
                return BadRequest("User with this e-mail doesn't exist");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || user.Password != request.Password)
            {
                return Unauthorized(); 
            }
            return Ok(user);
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(server.Models.RegisterDto registerDto)
        {
            if (string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.Password) || string.IsNullOrEmpty(registerDto.Name))
            {
                return BadRequest("All fields (Name, Email, and Password) are required.");
            }

            var isEmailInUse = await _context.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            var isNameInUse = await _context.Users.FirstOrDefaultAsync(u => u.Name == registerDto.Name);

            if (isEmailInUse != null)
            {
                return BadRequest("User with this e-mail already exist");
            }

            if (isNameInUse != null)
            {
                return BadRequest("User with this name already exist");
            }

            var hashedPassword = HashPassword(registerDto.Password);

            var user = new User
            {
                Name = registerDto.Name,
                Password = hashedPassword,
                Email = registerDto.Email,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetByEmail), new { email = user.Email }, user);
        }
        private string HashPassword(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!_context.Users.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Wystąpił problem podczas aktualizacji użytkownika.");
                }
            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
