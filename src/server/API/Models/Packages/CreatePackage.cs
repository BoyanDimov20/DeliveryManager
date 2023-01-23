using Data.Enums;

namespace API.Models.Packages
{
    public class CreatePackage
    {
        public string ReceiverName { get; set; }

        public string DeliveryAddress { get; set; }

        public double Weight { get; set; }

        public DeliveryType DeliveryType { get; set; }

        public string OfficeId { get; set; }
    }
}
