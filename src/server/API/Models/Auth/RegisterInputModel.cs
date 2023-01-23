using System.ComponentModel.DataAnnotations;

namespace API.Models.Auth
{
    public class RegisterInputModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        public string Address { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
