using Data.Models;
using Data.Repository;
using Microsoft.EntityFrameworkCore;
using Services.Contracts;

namespace Services.Implementation;

public class OfficeService : IOfficeService
{
    private readonly IRepository _repository;

    public OfficeService(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task CreateOffice(string name, string address)
    {
        await this._repository.Add(new Office
        {
            Name = name,
            Address = address
        });
    }

    public async Task AddEmployeesToOffice(string officeId, IEnumerable<string> employeeIds)
    {
        var office = await this._repository.GetById<Office>(officeId).FirstOrDefaultAsync();
        if (office == null)
        {
            return;
        }
        
        foreach (var employeeId in employeeIds)
        {
            var employee = await this._repository.GetById<Employee>(employeeId).FirstOrDefaultAsync();
            if (employee != null)
            {
                employee.OfficeId = officeId;
                await this._repository.Update(employee);
            }
        }
    }
}