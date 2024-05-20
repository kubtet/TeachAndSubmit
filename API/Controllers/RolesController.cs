using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class RolesController(Context context) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Role>>> GetRoles()
        {
            return await context.Roles.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Role>> GetRoleById(int id)
        {
            return await context.Roles.FindAsync(id);
        }
    }
}