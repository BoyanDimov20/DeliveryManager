using Services.Dtos;

namespace Services.Contracts
{
    public interface IUsersService
    {
        Task UpdateUser(string id, string name, EmployeeRoleModel role, string address);
    }
}
