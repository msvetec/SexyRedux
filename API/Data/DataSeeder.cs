using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public class DataSeeder
    {
        private readonly Context context;
        public DataSeeder(Context _context)
        {
            context = _context;
        }
        public void Seed()
        {
            if(context.Projects.Any()) return;
               List<Project> projects = new List<Project>
            {
                new Project
                {
                    Name = "Project 1",
                    Description = "Test project 1 for sexy redux"
                },
                 new Project
                {
                    Name = "Project 2",
                    Description = "Test project 2 for sexy redux"
                },
                 new Project
                {
                    Name = "Project 3",
                    Description = "Test project 3 for sexy redux"
                },
            };
            context.Projects.AddRange(projects);
            context.SaveChanges();
        }
    }
}