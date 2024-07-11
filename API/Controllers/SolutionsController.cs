using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SolutionsController(Context context) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Solution>>> GetSolutions()
        {
            var solutions = await context.Solutions.ToListAsync();
            return Ok(solutions);
        }
    }
}