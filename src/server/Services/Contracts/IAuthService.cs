using Data.Models;
using Microsoft.AspNetCore.Identity;

namespace Services.Contracts
{
    public interface IAuthService
    {
        Task<IdentityResult> CreateUser(string username, string password, string name);
        Task<User> GetUserById(string id);

        Task<int> GetRole(User user);
    }
}
