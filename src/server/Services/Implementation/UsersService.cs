using Data.Enums;
using Data.Models;
using Data.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Contracts;
using Services.Dtos;

namespace Services.Implementation
{
    public class UsersService : IUsersService
    {
        private readonly IRepository repository;
        private readonly UserManager<User> userManager;

        public UsersService(IRepository repository, UserManager<User> userManager)
        {
            this.repository = repository;
            this.userManager = userManager;
        }

        public async Task UpdateUser(string id, string name, string lastName, EmployeeRoleModel role, string address, string officeId)
        {
            var user = await this.repository.GetById<User>(id).FirstOrDefaultAsync();

            if (user != null)
            {
                user.FirstName = name;
                user.HomeAddress = address;
                user.LastName = lastName;

                await this.repository.Update(user);

                var employee = await this.repository.GetAll<Employee>()
                    .Where(x => x.UserId == user.Id)
                    .FirstOrDefaultAsync();

                if (employee != null)
                {
                    employee.OfficeId = officeId;
                }

                switch (role)
                {
                    case EmployeeRoleModel.Client:
                        if (employee != null)
                        {
                            await this.repository.Delete(employee);
                            await this.userManager.RemoveFromRoleAsync(user, "Admin");
                        }
                        break;
                    case EmployeeRoleModel.Consultant:
                        if (employee == null)
                        {
                            await this.repository.Add(new Employee
                            {
                                EmployeeRole = EmployeeRole.Consultant,
                                UserId = user.Id
                            });
                        }
                        else
                        {
                            employee.EmployeeRole = EmployeeRole.Consultant;
                            await this.repository.Update(employee);
                        }

                        await this.userManager.AddToRoleAsync(user, "Admin");
                        break;
                    case EmployeeRoleModel.Courier:
                        if (employee == null)
                        {
                            await this.repository.Add(new Employee
                            {
                                EmployeeRole = EmployeeRole.Courier,
                                UserId = user.Id
                            });
                        }
                        else
                        {
                            employee.EmployeeRole = EmployeeRole.Courier;
                            await this.repository.Update(employee);
                        }

                        await this.userManager.AddToRoleAsync(user, "Admin");
                        break;
                    case EmployeeRoleModel.Admin:
                        if (employee == null)
                        {
                            await this.repository.Add(new Employee
                            {
                                UserId = user.Id
                            });
                        }
                        else
                        {
                            await this.repository.Update(employee);
                        }
                        await this.userManager.AddToRoleAsync(user, "Admin");
                        break;
                    default:
                        break;
                }

                
            }
        }
    }
}
