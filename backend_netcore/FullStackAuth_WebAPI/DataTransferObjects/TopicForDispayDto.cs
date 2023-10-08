using FullStackAuth_WebAPI.Models;

namespace FullStackAuth_WebAPI.DataTransferObjects
{
    public class TopicForDispayDto
    {
        public int TopicId { get; set; }
        public string Title { get; set; }
        public DateTime TimePosted { get; set; }
        public int Likes { get; set; }
        public string Text { get; set; }


        public UserForDisplayDto User { get; set; }
        public List<CommentForDisplayDto> Comments { get; set; }


    }
}
