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
                    RegistrationDate = user.RegistrationDate,
                    Topics = topics.Select(t => new TopicForDisplayDto
                    {
                        TopicId = t.TopicId,
                        Title = t.Title,
                        TimePosted = t.TimePosted,
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
                        TimePosted = c.TimePosted,
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

    }
}
