using FullStackAuth_WebAPI.Data;
using FullStackAuth_WebAPI.DataTransferObjects;
using FullStackAuth_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static FullStackAuth_WebAPI.Models.DirectMessage;

namespace FullStackAuth_WebAPI.Controllers
{
    [Route("api/directmessage")]
    [ApiController]
    public class DirectMessageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DirectMessageController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public IActionResult GetAllChats()
        {
            try
            {
                string userId = User.FindFirstValue("id");
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var usersWithMessages = _context.DirectMessages.Where(m => m.ToUserId == userId).Select(u => u.FromUserId).Distinct().ToList();
                var users = _context.Users.Where(m => usersWithMessages.Contains(m.Id));

                var userswithMessgesDTO = users.Select(u => new UserForDisplayDto
                {
                    Id = u.Id,
                    UserName = u.UserName,
                }).ToList();

                return Ok(userswithMessgesDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("messages/{userFromId}"), Authorize]
        public IActionResult GetMessagesOfUser(string userFromId)
        {
            try
            {
                string userId = User.FindFirstValue("id");
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();


                var myMessages = _context.DirectMessages.Where(ufrom => ufrom.FromUserId == userId && ufrom.ToUserId == userFromId).ToList();

                var userMessages = _context.DirectMessages.Where(ufrom => ufrom.ToUserId == userId && ufrom.FromUserId == userFromId).ToList();

                myMessages.AddRange(userMessages);

                myMessages.Sort(new DirectMessageDateComparer());

                var directMessagesDto = myMessages.Select(m => new DirectMessageForDisplayDto
                {
                    DirectMessageId = m.DirectMessageId,
                    Text = m.Text,
                    MessageTime = m.MessageTime,
                    FromUserId = m.FromUserId,
                    ToUser = new UserForDisplayDto
                    {
                        UserName = _context.Users.FirstOrDefault(u => u.Id == m.FromUserId).UserName
                    },
                   
                    ToUserId = m.ToUserId,
                    FromUser = new UserForDisplayDto
                    {
                        UserName = _context.Users.FirstOrDefault(u => u.Id == m.ToUserId).UserName
                    }
                }).ToList();

                return Ok(directMessagesDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost, Authorize]
        public IActionResult SendMessage([FromBody] DirectMessage directMessage)
        {
            try
            {
                string userId = User.FindFirstValue("id");
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                directMessage.FromUserId = userId;
                directMessage.MessageTime = DateTime.Now;

                _context.DirectMessages.Add(directMessage);
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
