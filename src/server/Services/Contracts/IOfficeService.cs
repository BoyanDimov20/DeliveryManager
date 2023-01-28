namespace Services.Contracts;

public interface IOfficeService
{
    Task CreateOffice(string name, string address);

    Task AddEmployeesToOffice(string officeId, IEnumerable<string> employeeIds);
}