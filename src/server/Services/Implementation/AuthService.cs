using Data.Models;
using Data.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Contracts;

namespace Services.Implementation
{
    public class AuthService : IAuthService
    {
        private readonly IRepository repository;
        private readonly UserManager<User> userManager;

        public AuthService(IRepository repository, UserManager<User> userManager)
        {
            this.repository = repository;
            this.userManager = userManager;
        }

        public async Task<IdentityResult> CreateUser(string username, string password, string name)
        {
            var id = Guid.NewGuid().ToString();
            var user = new User
            {
                Id = id,
                UserName = username,
                FirstName = name,
            };

            var result = await userManager.CreateAsync(user, password);

            return result;
        }
        /// <summary>
        /// Клиент     -> 0
        /// Консултант -> 1
        /// Куриер     -> 2
        /// Админ      -> 3
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<int> GetRole(User user)
        {
            var role = 0;

            if (user == null)
            {
                return role;
            }

            var employee = await this.repository.GetAll<Employee>()
                .Where(x => x.UserId == user.Id)
                .Select(x => new
                {
                    x.EmployeeRole
                }).FirstOrDefaultAsync();

            if (employee != null)
            {
                switch (employee.EmployeeRole)
                {
                    case Data.Enums.EmployeeRole.Consultant:
                        role = 1;
                        break;
                    case Data.Enums.EmployeeRole.Courier:
                        role = 2; 
                        break;
                    default:
                        break;
                }
            }

            if (await this.userManager.IsInRoleAsync(user, "Admin"))
            {
                role = 3;
            }

            return role;
        }

        public async Task<User> GetUserById(string id)
        {
            var user = await repository.GetById<User>(id).FirstOrDefaultAsync();

            return user;
        }
    }
}
