using Services.Dtos;

namespace API.Models.Users
{
    public class UpdateUserModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public EmployeeRoleModel Role { get; set; }

        public string Address { get; set; }

        public string OfficeId { get; set; }
    }
}
