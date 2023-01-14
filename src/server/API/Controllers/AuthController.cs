using API.Models;
using Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterInputModel inputModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(this.ModelState.FirstOrDefault().Value?.Errors.FirstOrDefault()?.ErrorMessage);
            }

            var result = await this.userManager.CreateAsync(new Data.Models.User
            {
                UserName = inputModel.Username,
                Email = inputModel.Email,
                HomeAddress = inputModel.Address,
            }, inputModel.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.FirstOrDefault()?.Description);
            }

            return Ok();
        }

        public async Task<IActionResult> Login(LoginInputModel inputModel)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest();
            }

            var result = await this.signInManager.PasswordSignInAsync(inputModel.Username, inputModel.Password, true, false);

            if (!result.Succeeded)
            {
                return BadRequest("Invalid Password");
            }

            return Ok();
        }
    }
}
