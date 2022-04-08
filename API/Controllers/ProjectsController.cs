using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly Context _context;
        public ProjectsController(Context context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Project>>> GetProjects()
        {
            List<Project> projects = _context.Projects.ToList();
            return Ok(projects);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(long id)
        {
            var project = _context.Projects.Where(x => x.Id == id).FirstOrDefault();
            _context.Projects.Remove(project!);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> Create(Project dto)
        {
            try
            {
                var project = new Project
                {
                    Name = dto.Name,
                    Description = dto.Description,
                };
                _context.Projects.Add(project);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex) { return BadRequest(); }


        }
    }
}