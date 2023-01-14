using Data.Models;
using Data.Repository;

namespace Services
{
    public class UsersService
    {
        private readonly IRepository repository;

        public UsersService(IRepository repository) 
        {
            this.repository = repository;
        }
    }
}
