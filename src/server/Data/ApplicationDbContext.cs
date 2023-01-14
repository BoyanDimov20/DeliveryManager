using Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Office> Offices { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Package> Packages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Office>()
                .HasMany(x => x.Employees)
                .WithOne(x => x.Office)
                .HasForeignKey(x => x.OfficeId);

            builder.Entity<Office>()
                .HasMany(x => x.PackagesInStorage)
                .WithOne(x => x.ReceivedAtOffice)
                .HasForeignKey(x => x.ReceivedAtOfficeId);

            builder.Entity<User>()
                .HasMany(x => x.PackagesSent)
                .WithOne(x => x.SenderUser)
                .HasForeignKey(x => x.SenderUserId);

            builder.Entity<User>()
                .HasOne(x => x.Employee)
                .WithOne(x => x.User)
                .HasForeignKey<Employee>(x => x.UserId);
        }
    }
}
