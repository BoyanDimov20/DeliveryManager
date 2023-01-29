using Data.Enums;

namespace API.Models.Packages;

public class PackageHistoryDto
{
    public string Id { get; set; }
    public DeliveryType DeliveryType { get; set; }
    public double? Price { get; set; }
    public Status Status { get; set; }

    public string ReceivedInOfficeId { get; set; }
}