using FullStackAuth_WebAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace FullStackAuth_WebAPI.DataTransferObjects
{
    public class UserForDisplayDto
    {
        //DTO used when displaying User linked with FK
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public DateTime RegistrationDate { get; set; }

        public List<TopicForDisplayDto> Topics { get; set; }
        public List<CommentForDisplayDto> Comments { get; set; }

    }
}
