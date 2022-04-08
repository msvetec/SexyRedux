using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Context: DbContext
    {
        public Context(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Project> Projects {get;set;}
    }
}