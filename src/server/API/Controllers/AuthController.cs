using API.Models.Auth;
using Data.Models;
using Data.Repository;
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
        private readonly IRepository repository;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IAuthService authService, IRepository repository)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.authService = authService;
            this.repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterInputModel inputModel)
        {
            if (inputModel.Password != inputModel.ConfirmPassword)
            {
                return BadRequest("Паролите не съвпадат");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(this.ModelState.FirstOrDefault().Value?.Errors.FirstOrDefault()?.ErrorMessage);
            }

            var result = await this.userManager.CreateAsync(new Data.Models.User
            {
                UserName = inputModel.Username,
                Email = inputModel.Email,
                HomeAddress = inputModel.Address,
                FirstName = inputModel.FirstName,
                LastName = inputModel.LastName,
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
                IsAdmin = this.User.IsInRole("Admin"),
                HasAtLeastOnePackage = user != null && this.repository.GetAll<Package>().Where(x => x.SenderUserId == user.Id).Count() > 0,
                HasAtLeastOnePackageProcessed = user != null && this.repository.GetAll<Package>().Where(x => x.SenderUserId == user.Id && x.Status != Data.Enums.Status.Processing).Count() > 0
            });
        }
    }
}
