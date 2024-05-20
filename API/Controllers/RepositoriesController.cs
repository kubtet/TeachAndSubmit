using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class RepositoriesController(Context context) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Repository>>> GetRepositories()
        {
            return await context.Repositories.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Repository>> GetRepositoryById(int id)
        {
            return await context.Repositories.FindAsync(id);
        }
    }
}