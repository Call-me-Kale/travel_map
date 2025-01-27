using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using server.Settings;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using ResetPasswordRequest = server.Models.ResetPasswordRequest;
using ForgotPasswordRequest = server.Models.ForgotPasswordRequest;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json; 

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersControllers : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly MailSettings _mailSettings;

        public UsersControllers(ApiDbContext context, IOptions<MailSettings> mailSettings)
        {
            _context = context;
            _mailSettings = mailSettings.Value;
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

            var token = Guid.NewGuid().ToString();



            user.SessionToken = token;
            user.TokenExpiresAt = DateTime.UtcNow.AddHours(1);

            _context.Users.Update(user);
            _context.SaveChanges();

            return Ok(new { token = token, userData = "" });
        }

        [HttpPost("login_by_token")]
        public async Task<ActionResult<User>> LoginByToken([FromBody] server.Models.LoginByTokenRequest request)
        {
            if (string.IsNullOrEmpty(request.Token))
            {
                return BadRequest("Field Token is required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.SessionToken == request.Token);

            if (user == null)
            {
                return BadRequest("User with this token doesn't exist");
            }

            if (user.TokenExpiresAt < DateTime.UtcNow)
            {
                return BadRequest("Token has expired");
            }

            return Ok(new { token = request.Token, userData = "" });
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


        [HttpPost("forgot_password")]
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

            var resetUrl = $"http://localhost:3000/reset_password?token={resetToken}";
            var subject = "Resetowanie hasła";
            var body = $"Aby zresetować hasło, kliknij w poniższy link:\n{resetUrl}";

            var fromAddress = _mailSettings.FromAddress;
            var fromName = _mailSettings.FromName;
            var mailerSendApiKey = _mailSettings.MailerSendApiKey; 

            try
            {
                using (var httpClient = new HttpClient())
                {
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", mailerSendApiKey);

                    var emailData = new
                    {
                        from = new
                        {
                            email = fromAddress,
                            name = fromName
                        },
                        to = new[]
                        {
                            new
                            {
                                email = user.Email,
                                name = user.Name ?? ""
                            }
                        },
                        subject = subject,
                        text = body,
                        html = $"<p>{body.Replace("\n", "<br>")}</p>"
                    };

                    var jsonBody = JsonConvert.SerializeObject(emailData);

                    var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    var response = await httpClient.PostAsync("https://api.mailersend.com/v1/email", content);

                    if (!response.IsSuccessStatusCode)
                    {
                        var responseError = await response.Content.ReadAsStringAsync();
                        return StatusCode((int)response.StatusCode, $"Błąd wysyłania emaila przez MailerSend: {responseError}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Błąd wysyłania emaila (MailerSend): " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "Error sending email.");
            }

            return Ok("Email with instructions has been sent (if user exists).");
        }

        [HttpPost("reset_password")]
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
