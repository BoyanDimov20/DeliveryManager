namespace API.Models.Packages;

public class PackageHistoryResult
{
    public string OfficeId { get; set; }
    public string OfficeName { get; set; }

    public OfficePackageResult NotProcessed { get; set; }
    public OfficePackageResult InStorage { get; set; }
    public OfficePackageResult Delivered { get; set; }
}