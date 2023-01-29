using Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Data.Repository
{
    public class Repository : IRepository
    {
        private readonly ApplicationDbContext dbContext;

        public Repository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task Add(IEntity entity)
        {
            await this.dbContext.AddAsync(entity);
            
            if (entity.GetType() == typeof(Package))
            {
                var package = (Package)entity;
                await this.Add(new PackageHistory
                {
                    PackageId = package.Id,
                    Status = package.Status,
                    DeliveryAddress = package.DeliveryAddress,
                    Price = package.Price,
                    Weight = package.Weight,
                    DeliveryType = package.DeliveryType,
                    ReceiverName = package.ReceiverName,
                    ReceivedAtOfficeId = package.ReceivedAtOfficeId
                });
            }
            
            await this.dbContext.SaveChangesAsync();
            
        }

        public async Task Delete(IEntity entity)
        {
            this.dbContext.Remove(entity);
            await this.dbContext.SaveChangesAsync();
        }

        public IQueryable<T> GetAll<T>() where T : class, IEntity
        {
            return this.dbContext.Set<T>().AsQueryable<T>();
        }

        public IQueryable<T> GetById<T> (string id) where T : class, IEntity
        {
            return this.dbContext.Set<T>().Where(x => x.Id == id).Take(1);
        }

        public async Task Update(IEntity entity)
        {
            if (entity.GetType() == typeof(Package))
            {
                var package = (Package)entity;
                await this.dbContext.PackageHistory.AddAsync(new PackageHistory
                {
                    PackageId = package.Id,
                    Status = package.Status,
                    DeliveryAddress = package.DeliveryAddress,
                    Price = package.Price,
                    Weight = package.Weight,
                    DeliveryType = package.DeliveryType,
                    ReceiverName = package.ReceiverName,
                    ReceivedAtOfficeId = package.ReceivedAtOfficeId
                });
            }
            
            entity.UpdatedOn = DateTime.Now;
            this.dbContext.Update(entity);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task DeleteById<T>(string id) where T : class, IEntity, new()
        {
            var entity = await this.dbContext.Set<T>().Where(x => x.Id == id).FirstOrDefaultAsync();

            if (entity != null)
            {
                this.dbContext.Remove(entity);
                await this.dbContext.SaveChangesAsync();
            }
        }

        public async Task Delete<T>(Expression<Func<T, bool>> predicate) where T : class, IEntity
        {
            var entities = this.dbContext.Set<T>().Where(predicate);
            this.dbContext.RemoveRange(entities);
            await this.dbContext.SaveChangesAsync();
        }
    }
}
