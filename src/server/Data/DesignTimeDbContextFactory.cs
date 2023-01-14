﻿using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    internal class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var path = Environment.CurrentDirectory;
            var DbPath = Path.Join(path, "delivarymanager.db");


            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseSqlite($"Data Source={DbPath}");

            return new ApplicationDbContext(builder.Options);
        }
    }
}
