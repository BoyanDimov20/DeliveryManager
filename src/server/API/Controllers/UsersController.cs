using API.Models;
using Data.Models;
using Data.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepository repository;

        public UsersController(IRepository repository)
        {
            this.repository = repository;
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
            var user = await this.repository.GetById<User>(id).Select(x => new
            {
                Id = x.Id,
                Username = x.UserName,
                FirstName = x.FirstName,
                LastName = x.LastName,
                HomeAddress = x.HomeAddress,
                Role = ""
            }).FirstOrDefaultAsync();

            return Ok(user);
        }
    }
}
