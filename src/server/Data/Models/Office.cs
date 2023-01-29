namespace Data.Models
{
    public class Office : IEntity
    {
        public Office()
        {
            Id = Guid.NewGuid().ToString();
            CreatedOn = DateTime.Now;
            UpdatedOn = DateTime.Now;
        }

        public string Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public ICollection<Employee> Employees { get; set; }
        public ICollection<Package> PackagesInStorage { get; set; }
        public ICollection<PackageHistory> PackagesHistory { get; set; }
    }
}
