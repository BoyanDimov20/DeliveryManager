using System.ComponentModel.DataAnnotations;

namespace API
{
    public class CommentPost
    {
        [Required]
        public string Id { get; set; }

        public string Content { get; set; }
    }
}
