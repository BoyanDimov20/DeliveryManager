using API.Models.Offices;
using Data.Models;
using Data.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Contracts;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class OfficeController : ControllerBase
{
    private readonly IOfficeService _officeService;
    private readonly IRepository _repository;

    public OfficeController(IOfficeService officeService, IRepository repository)
    {
        _officeService = officeService;
        _repository = repository;
    }
    
    public async Task<IActionResult> Get()
    {
        var offices = await this._repository.GetAll<Office>()
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.Address
            }).ToListAsync();

        return Ok(offices);
    }
    
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Post(CreateOfficeModel model)
    {
        await this._officeService.CreateOffice(model.Name, model.Address);

        return this.Ok();
    }
    
    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddEmployeeToOffice(AddEmployeesToOffice model)
    {
        await this._officeService.AddEmployeesToOffice(model.OfficeId, model.EmployeeIds);

        return Ok();
    }
}