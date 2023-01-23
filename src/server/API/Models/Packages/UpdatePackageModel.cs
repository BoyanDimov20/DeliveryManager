using Data.Enums;

namespace API.Models.Packages
{
    public class UpdatePackageModel
    {
        public string Id { get; set; }

        public string Address { get; set; }

        public DeliveryType DeliveryType { get; set; }

        public string ReceiverName { get; set; }

        public string SenderName { get; set; }

        public Status Status { get; set; }
    }
}
