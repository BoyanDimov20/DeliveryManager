using API.Models.Shared;
using API.Models.Users;
using Data.Models;
using Data.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Contracts;

namespace API.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {
        private readonly IRepository repository;
        private readonly IUsersService usersService;
        private readonly IAuthService authService;

        public UsersController(IRepository repository, IUsersService usersService, IAuthService authService)
        {
            this.repository = repository;
            this.usersService = usersService;
            this.authService = authService;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public async Task<IActionResult> Get()
        {
            var users = await this.repository.GetAll<User>().Select(x => new UsersResult
            {
                Id = x.Id,
                Username = x.UserName,
                Email = x.Email,
                FirstName = x.FirstName,
                LastName = x.LastName,
                HomeAddress = x.HomeAddress,
                PhoneNumber = x.PhoneNumber

            }).ToArrayAsync();

            return Ok(new ListResult<UsersResult>
            {
                Labels = new Label[] {
                    new Label
                    {
                        Key= "id",
                        Value = "ID"
                    },
                    new Label
                    {
                        Key = "username",
                        Value= "Потребител"
                    },

                    new Label
                    {
                        Key = "email",
                        Value= "Електронна поща"
                    },
                    new Label {
                        Key= "firstName",
                        Value="Име "
                    },
                    new Label
                    {
                        Key = "lastName",
                        Value= "Фамилия"
                    },
                    new Label
                    {
                        Key= "homeAddress",
                        Value="Адрес"
                    },
                    new Label
                    {
                        Key = "phoneNumber",
                        Value="Телефон"
                    }
                },
                Data = users
            });
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await this.repository.GetById<User>(id).FirstOrDefaultAsync();

            var employeeInfo = await this.repository.GetAll<Employee>()
                .Where(x => x.UserId == user.Id)
                .Select(x => new
                {
                    x.Id,
                    x.OfficeId
                })
                .FirstOrDefaultAsync();

            return Ok(new
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                HomeAddress = user.HomeAddress,
                Role = await this.authService.GetRole(user),
                EmployeeId = employeeInfo.Id,
                OfficeId = employeeInfo.OfficeId                
            });
        }

        [HttpPut]
        [Route("api/[controller]")]
        public async Task<IActionResult> Update(UpdateUserModel model)
        {
            await this.usersService.UpdateUser(model.Id, model.Name, model.Role, model.Address, model.OfficeId);

            return Ok();
        }

        [HttpDelete("/api/[controller]/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await this.repository.DeleteById<User>(id);

            return Ok();
        }
    }
}
