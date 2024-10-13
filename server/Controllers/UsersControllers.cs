using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersControllers : ControllerBase
    {
        private static List<User> users = new List<User>()
        {
            new User(){ Id = 1, Name = "User 1" },
            new User(){ Id = 2, Name = "User 2" }
        };
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAll()
        {
            return users;
        }
        [HttpGet("{id}")]
        public ActionResult<User> GetById(int id)
        { 
            var user = users.FirstOrDefault(p => p.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }
        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            user.Id = users.Max(p => p.Id) + 1;
            users.Add(user);
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, User user)
        {
            var existingUser = users.FirstOrDefault(p => p.Id == id);
            if (existingUser == null)
            {
                return NotFound();
            }
            existingUser.Name = user.Name;
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = users.FirstOrDefault(p => p.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            users.Remove(user);
            return NoContent();
        }
    }
}
