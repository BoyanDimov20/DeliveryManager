using Data.Enums;

namespace Data.Models;

public class PackageHistory : IEntity
{
    public PackageHistory()
    {
        Id = Guid.NewGuid().ToString();
        CreatedOn = DateTime.Now;
        UpdatedOn = DateTime.Now;
        IsDeleted = false;
    }
    
    public string Id { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
    public DateTime? DeletedOn { get; set; }
    public bool IsDeleted { get; set; }

    public Package Package { get; set; }
    public string PackageId { get; set; }

    public string ReceiverName { get; set; }
    public DeliveryType DeliveryType { get; set; }
    public Status Status { get; set; }
    public string DeliveryAddress { get; set; }
    public double Weight { get; set; }
    public double? Price { get; set; }
    
    public Office ReceivedAtOffice { get; set; }
    public string ReceivedAtOfficeId { get; set; }
}