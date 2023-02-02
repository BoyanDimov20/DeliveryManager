using System.Globalization;
using API.EnumConverters;
using API.Models.Packages;
using API.Models.Shared;
using API.Models.Users;
using Data.Enums;
using Data.Models;
using Data.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    public class PackagesController : ControllerBase
    {
        private readonly IRepository repository;
        private readonly UserManager<User> userManager;

        public PackagesController(IRepository repository, UserManager<User> userManager)
        {
            this.repository = repository;
            this.userManager = userManager;
        }

        [HttpGet("api/[controller]")]
        public async Task<IActionResult> Get()
        {
            var userId = this.userManager.GetUserId(User);

            var packages = await this.repository.GetAll<Package>()
                .Where(x => x.SenderUserId == userId || User.IsInRole("Admin"))
                .Select(x => new PackageResult
                {
                    Id = x.Id,
                    SenderName = string.IsNullOrEmpty(x.SenderName) ? x.SenderUser.FirstName : x.SenderName,
                    ReceiverName = x.ReceiverName,
                    DeliveryType = EnumConverter.GetDeliveryTypeName(x.DeliveryType),
                    Status = EnumConverter.GetPackageStatusName(x.Status),
                    DeliveryAddress = x.DeliveryAddress

                }).ToArrayAsync();

            return Ok(new ListResult<PackageResult>
            {
                Labels = new Label[] {
                    new Label
                    {
                        Key= "id",
                        Value = "ID"
                    },
                    new Label
                    {
                        Key = "senderName",
                        Value= "Име на изпращач"
                    },

                    new Label
                    {
                        Key = "receiverName",
                        Value= "Име на получател"
                    },
                    new Label {
                        Key= "deliveryType",
                        Value="Вид на доставка "
                    },
                    new Label
                    {
                        Key = "status",
                        Value= "Статус"
                    },
                    new Label
                    {
                        Key= "deliveryAddress",
                        Value="Адрес"
                    }
                },
                Data = packages
            });
        }

        [HttpGet("api/[controller]/{id}")]
        public async Task<IActionResult> Get(string id)
        {

            var package = await this.repository.GetById<Package>(id).FirstOrDefaultAsync();

            if (string.IsNullOrEmpty(package.SenderName))
            {
                package.SenderName = await this.repository.GetAll<User>()
                    .Where(x => x.Id == package.SenderUserId)
                    .Select(x => x.FirstName)
                    .FirstOrDefaultAsync();
            }

            return Ok(package);
        }

        [HttpPost("api/[controller]")]
        public async Task<IActionResult> Post(CreatePackage model)
        {
            var user = await this.userManager.GetUserAsync(User);
            if (model.DeliveryType != DeliveryType.ToOffice)
            {
                await this.repository.Add(new Package
                {
                    ReceiverName = model.ReceiverName,
                    DeliveryType = model.DeliveryType,
                    Weight = model.Weight,
                    SenderUserId = user.Id,
                    SenderName = user.FirstName,
                    Status = Status.Processing,
                    DeliveryAddress = model.DeliveryAddress,
                    ReceivedAtOfficeId = model.ReceivedAtOfficeId,
                    Price = CalculatePrice(model.Weight, model.DeliveryType)
                });
            }
            else
            {
                var office = await this.repository.GetById<Office>(model.OfficeId).Select(x => new
                {
                    x.Address
                }).FirstOrDefaultAsync();

                await this.repository.Add(new Package
                {
                    ReceiverName = model.ReceiverName,
                    DeliveryType = model.DeliveryType,
                    Weight = model.Weight,
                    SenderUserId = user.Id,
                    SenderName = user.FirstName,
                    Status = Status.Processing,
                    DeliveryAddress = office != null ? office.Address : "",
                    ReceivedAtOfficeId = model.ReceivedAtOfficeId
                });
            }


            return Ok();
        }

        [HttpPut("api/[controller]")]
        public async Task<IActionResult> Update(UpdatePackageModel model)
        {
            var package = await this.repository.GetById<Package>(model.Id).FirstOrDefaultAsync();
            if (package != null)
            {
                package.SenderName = model.SenderName;
                package.ReceiverName = model.ReceiverName;
                package.DeliveryAddress = model.Address;
                package.DeliveryType = model.DeliveryType;
                package.Status = model.Status;

                await this.repository.Update(package);
            }

            return Ok();
        }

        [HttpDelete("api/[controller]/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await this.repository.DeleteById<Package>(id);

            return this.Ok();
        }

        [HttpPost("api/[controller]/history")]
        public async Task<IActionResult> GetPackageHistory([FromBody]PackageHistoryModel model)
        {
            var cultureInfo = new CultureInfo("bg-BG");
            
            var packages = await this.repository.GetAll<PackageHistory>()
                .Where(x => x.CreatedOn.Ticks >= DateTime.Parse(model.StartDate, cultureInfo).Ticks
                            && x.CreatedOn.Ticks <= DateTime.Parse(model.EndDate, cultureInfo).Ticks)
                .Select(x => new PackageHistoryDto
                {
                    Id = x.PackageId,
                    DeliveryType = x.DeliveryType,
                    Price = x.Price,
                    Status = x.Status,
                    ReceivedInOfficeId = x.ReceivedAtOfficeId
                }).ToListAsync();

            
            
            var notProcessed = packages.Where(x => x.Status == Status.Processing);
            var inStorage = packages.Where(x => x.Status == Status.Sent || x.Status == Status.Waiting);
            var delivered = packages.Where(x => x.Status == Status.Delivered);
            
            var offices = await this.repository.GetAll<Office>().Select(x => new PackageHistoryResult
            {
                OfficeId = x.Id,
                OfficeName = x.Name + $" ({x.Address})"
            }).ToListAsync();

            foreach (var office in offices)
            {
                var notProcessedForOffice = notProcessed.Where(x => x.ReceivedInOfficeId == office.OfficeId);
                office.NotProcessed = new OfficePackageResult
                {
                    Count = notProcessedForOffice.Count(),
                    Income = notProcessedForOffice.DistinctBy(x => x.Id).Sum(x => x.Price)
                };
                
                var inStorageForOffice = inStorage.Where(x => x.ReceivedInOfficeId == office.OfficeId);
                office.InStorage = new OfficePackageResult
                {
                    Count = inStorageForOffice.Count(),
                    Income = inStorageForOffice.DistinctBy(x => x.Id).Sum(x => x.Price)
                };
                
                var deliveredForOffice = delivered.Where(x => x.ReceivedInOfficeId == office.OfficeId);
                office.Delivered = new OfficePackageResult
                {
                    Count = deliveredForOffice.Count(),
                    Income = deliveredForOffice.DistinctBy(x => x.Id).Sum(x => x.Price)
                };
            }

            return Ok(offices);
        }

        private double CalculatePrice(double weight, DeliveryType deliveryType)
        {
            double price = weight * 3.5;
            switch (deliveryType)
            {
                case DeliveryType.ToOffice:
                    price += 2;
                    break;
                case DeliveryType.ToAddress:
                    price += 8;
                    break;
                case DeliveryType.ToAddressExpress:
                    price += 15;
                    break;
                default:
                    break;
            }

            return price;
        }
    }
}
