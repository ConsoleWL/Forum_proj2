using FullStackAuth_WebAPI.Data;
using FullStackAuth_WebAPI.DataTransferObjects;
using FullStackAuth_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public UserController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _context.Users.ToList();

                var userDto = users.Select(u => new UserForDisplayDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    RegistrationDate = u.RegistrationDate.ToString("yyyy-MM-dd"),

                }).ToList();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetUserData(string id)
        {
            try
            {
                var user = _context.Users
                    .Include(t => t.Topics)
                    .Include(c => c.Comments)
                    .FirstOrDefault(u => u.Id == id);

                if (user is null)
                    return NotFound();

                var topics = _context.Topics.Include(u => u.AuthorOfTopic).Where(user => user.AuthorOfTopicId == id).ToList();
                var comments = _context.Comments.Where(user => user.CommentOfUserId == id).ToList();

                var userDto = new UserForDisplayDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    RegistrationDate = user.RegistrationDate.ToString("yyyy-MM-dd"),
                    Topics = topics.Select(t => new TopicForDisplayDto
                    {
                        TopicId = t.TopicId,
                        Title = t.Title,
                        TimePosted = t.TimePosted.ToString("yyyy-MM-dd"),
                        Likes = t.Likes,
                        Text = t.Text,
                        AuthorOfTopic = new UserForDisplayDto
                        {
                            UserName = t.AuthorOfTopic.UserName
                        }
                    }).ToList(),
                    Comments = comments.Select(c => new CommentForDisplayDto
                    {
                        CommentId = c.CommentId,
                        Text = c.Text,
                        TimePosted = c.TimePosted.ToString("yyyy-MM-dd"),
                        Likes = c.Likes,
                        CommentOfUser = new UserForDisplayDto
                        {   
                            Id = c.CommentOfUser.Id,
                            UserName = c.CommentOfUser.UserName
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

        [HttpPut, Authorize]
        public IActionResult UpdateUser([FromBody] User user)
        {
            try
            {
                string userId = User.FindFirstValue("id");
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var existUser = _context.Users.FirstOrDefault(user => user.Id == userId);
                if (existUser is null)
                    return NotFound();

                existUser.LastName = user.LastName;
                existUser.FirstName = user.FirstName;
                existUser.Email = user.Email;

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                _context.SaveChanges();
                return StatusCode(201);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
