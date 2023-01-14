using Data.Enums;

namespace Data.Models
{
    public class Employee : IEntity
    {
        public Employee()
        {
            Id = Guid.NewGuid().ToString();
            CreatedOn = DateTime.Now;
            UpdatedOn = DateTime.Now;
        }
        public string Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public EmployeeRole EmployeeRole { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public Office Office { get; set; }
        public string OfficeId { get; set; }
    }
}
