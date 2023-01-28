namespace API.Models.Offices;

public class AddEmployeesToOffice
{
    public string OfficeId { get; set; }

    public string[] EmployeeIds { get; set; }
}