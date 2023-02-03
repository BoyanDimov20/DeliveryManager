using Services.Dtos;

namespace Services.Contracts
{
    public interface IUsersService
    {
        Task UpdateUser(string id, string name, string lastName, EmployeeRoleModel role, string address, string officeId);
    }
}
