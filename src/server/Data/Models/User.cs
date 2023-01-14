using Microsoft.AspNetCore.Identity;

namespace Data.Models
{
    public class User : IdentityUser, IEntity
    {
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string HomeAddress { get; set; }

        public ICollection<Package> PackagesSent { get; set; }
        public Employee Employee { get; set; }
    }
}
