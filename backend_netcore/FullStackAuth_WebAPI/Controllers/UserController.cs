using FullStackAuth_WebAPI.Data;
using FullStackAuth_WebAPI.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FullStackAuth_WebAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}"), Authorize]
        public IActionResult Get(string id)
        {
            try
            {
                string userId = User.FindFirstValue("id");
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var user = _context.Users
                    .Include(t => t.Topics)
                    .Include(c => c.Comments)
                    .FirstOrDefault(u => u.Id == id);

                if (user is null)
                    return NotFound();

                var topics = _context.Topics.Include(u => u.User).Where(user => user.UserId == id).ToList();
                var comments = _context.Comments.Where(user => user.UserId == id).ToList();

                var userDto = new UserForDisplayDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    RegistrationDate = user.RegistrationDate,
                    Topics = topics.Select(t => new TopicForDispayDto
                    {
                        TopicId = t.TopicId,
                        Title = t.Title,
                        TimePosted = t.TimePosted,
                        Likes = t.Likes,
                        Text = t.Text
                    }).ToList(),
                    Comments = comments.Select(c => new CommentForDisplayDto
                    {
                        CommentId = c.CommentId,
                        Text = c.Text,
                        TimePosted = c.TimePosted,
                        Likes = c.Likes,
                        User = new UserForDisplayDto
                        {
                            UserName = c.User.UserName
                        },

                    }).ToList()
                };

                return Ok(userDto);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

    }
}
