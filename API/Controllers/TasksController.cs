using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TasksController(Context context) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Entities.Task>>> GetTasks()
        {
            return await context.Tasks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Entities.Task>> GetTaskById(int id)
        {
            return await context.Tasks.FindAsync(id);
        }

        [HttpGet("repository/{id}")]
        public async Task<ActionResult<List<Entities.Task>>> GetTasksForRepository(int id)
        {
            return await context.Tasks.Where(t => t.RepositoryId == id).ToListAsync();
        }
    }
}