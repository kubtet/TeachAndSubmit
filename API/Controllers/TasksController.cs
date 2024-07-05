using API.Data;
using API.DTOs;
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

        [HttpPost("create")]
        public async Task<ActionResult<Entities.Task>> CreateTask(CreateTaskDto input)
        {
            if (input == null)
            {
                return BadRequest("No input provided");
            }

            var task = new Entities.Task
            {
                RepositoryId = input.RepositoryId,
                Name = input.Name,
                Description = input.Description,
                DeadlineDate = input.DeadlineDate,
                CreationDate = DateTime.Now
            };

            await context.Tasks.AddAsync(task);
            await context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> RemoveTask(int Id)
        {
            var entity = context.Tasks.FirstOrDefault(x => x.Id == Id);

            if (entity != null)
            {
                context.Tasks.Remove(entity);
                await context.SaveChangesAsync();
            }

            return Ok();
        }
    }
}