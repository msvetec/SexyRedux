using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Project
    {
        [Key]
        public long Id {get;set;}
        public string? Name {get;set;}
        public string? Description {get;set;}
    }
}