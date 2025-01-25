using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using System.Text;
using System.Net;
using System.Net.Mail;
using ResetPasswordRequest = server.Models.ResetPasswordRequest;
using ForgotPasswordRequest = server.Models.ForgotPasswordRequest;

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

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("User with this e-mail doesn't exist");
            }

            if (!VerifyPassword(request.Password, user.Password, user.Salt))
            {
                return Unauthorized();
            }

            return Ok(new { email = user.Email, name = user.Name });
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(server.Models.RegisterDto registerDto)
        {
            if (string.IsNullOrEmpty(registerDto.Email)
                || string.IsNullOrEmpty(registerDto.Password)
                || string.IsNullOrEmpty(registerDto.Name))
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

            var (hashedPassword, salt) = HashPassword(registerDto.Password);

            var user = new User(
                name: registerDto.Name,
                password: hashedPassword,
                email: registerDto.Email,
                salt: salt
            );

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetByEmail), new { email = user.Email }, user);
        }

        private (string hashedPassword, byte[] salt) HashPassword(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return (hashedPassword, salt);
        }

        private bool VerifyPassword(string enteredPassword, string storedHash, byte[] salt)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: enteredPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashedPassword == storedHash;
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
                return BadRequest("Email is required.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return NotFound("User with this email does not exist.");

            var resetToken = Guid.NewGuid().ToString();
            user.ResetPasswordToken = resetToken;
            user.ResetPasswordTokenExpires = DateTime.UtcNow.AddMinutes(5);

            await _context.SaveChangesAsync();

            try
            {
                // Zamień "yourdomain.pl" na swój frontend czy link do resetu
                var resetUrl = $"https://yourdomain.pl/reset-password?token={resetToken}";

                var subject = "Resetowanie hasła";
                var body = $"Aby zresetować hasło kliknij w poniższy link:\n{resetUrl}";

                var smtpHost = "smtp.mailersend.net";
                var smtpPort = 587;
                var smtpUsername = "MS_GxLZ1O@trial-351ndgwxkr54zqx8.mlsender.net";
                var smtpPassword = "mssp.C7B8z0c.o65qngk8yxwgwr12.1pRS9Om";

                using (var smtpClient = new SmtpClient(smtpHost, smtpPort))
                {
                    smtpClient.EnableSsl = true;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

                    var mailMessage = new MailMessage
                    {
                        // 'From' musi być domeną/adresem zweryfikowanym w MailerSend
                        From = new MailAddress("trial-351ndgwxkr54zqx8.mlsender.net", "Twoja Aplikacja"),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = false
                    };

                    mailMessage.To.Add(user.Email);
                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Błąd wysyłania emaila: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "Error sending email.");
            }

            return Ok("Email with instructions has been sent (if user exists).");
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Token) || string.IsNullOrEmpty(request.NewPassword))
                return BadRequest("Token and new password are required.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.ResetPasswordToken == request.Token);
            if (user == null)
            {
                return BadRequest("Invalid token.");
            }

            if (user.ResetPasswordTokenExpires < DateTime.UtcNow)
            {
                return BadRequest("Token has expired.");
            }

            var (hashedPassword, salt) = HashPassword(request.NewPassword);
            user.Password = hashedPassword;
            user.Salt = salt;

            user.ResetPasswordToken = null;
            user.ResetPasswordTokenExpires = null;

            await _context.SaveChangesAsync();

            return Ok("Password has been reset successfully.");
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
                if (!_context.Users.Any(e => e.Id == id))
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
