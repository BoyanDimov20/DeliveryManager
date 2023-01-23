using Data.Enums;

namespace API.Models.Packages
{
    public class PackageResult
    {
        public string Id { get; set; }

        public string SenderName { get; set; }

        public string ReceiverName { get; set; }

        public string DeliveryType { get; set; }

        public string Status { get; set; }

        public string DeliveryAddress { get; set; }
    }
}
