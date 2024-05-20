using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersRepositoriesController(Context context) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<UserRepository>>> GetRepositories()
        {
            return await context.UsersRepositories.ToListAsync();
        }
    }
}