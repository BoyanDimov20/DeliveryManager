using API.Models.Auth;
using Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IAuthService authService;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IAuthService authService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.authService = authService;
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

        public async Task<IActionResult> Logout()
        {
            await this.signInManager.SignOutAsync();

            return Ok();
        }

        public async Task<IActionResult> Me()
        {
            var user = await this.userManager.GetUserAsync(User);
            return Ok(new
            {
                IsAuthenticated = User.Identity.IsAuthenticated,
                Username = User.Identity.Name,
                IsAdmin = this.User.IsInRole("Admin")
            });
        }
    }
}
