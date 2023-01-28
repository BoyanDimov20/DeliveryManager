using System.ComponentModel.DataAnnotations;

namespace API.Models.Offices;

public class CreateOfficeModel
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Address { get; set; }
}