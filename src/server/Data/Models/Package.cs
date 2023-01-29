using Data.Enums;

namespace Data.Models
{
    public class Package : IEntity
    {
        public Package()
        {
            Id = Guid.NewGuid().ToString();
            CreatedOn = DateTime.Now;
            UpdatedOn = DateTime.Now;
            
        }

        public string Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        
        public string SenderName { get; set; }
        public User SenderUser { get; set; }
        public string SenderUserId { get; set; }

        public Office ReceivedAtOffice { get; set; }
        public string ReceivedAtOfficeId { get; set; }

        public string DeliveryAddress { get; set; }
        public string ReceiverName { get; set; }

        public double Weight { get; set; }
        public DeliveryType DeliveryType { get; set; }
        public Status Status { get; set; }

        public double? Price { get; set; }

        public ICollection<PackageHistory> PackageHistory { get; set; }
    }
}
