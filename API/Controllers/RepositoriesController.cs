using API.Data;
using API.DTOs;
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
            return await context.Repositories
                .Include(r => r.UserRepositories)
                .Select(r => new Repository
                {
                    Id = r.Id,
                    Subject = r.Subject,
                    UserRepositories = r.UserRepositories.Select(ur => new UserRepository
                    {
                        UserId = ur.UserId,
                    }).ToList()
                })
                .ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Repository>> GetRepositoryById(int id)
        {
            var repository = await context.Repositories
                .Include(r => r.UserRepositories)
                .Where(r => r.Id == id)
                .Select(r => new Repository
                {
                    Id = r.Id,
                    Subject = r.Subject,
                    UserRepositories = r.UserRepositories.Select(ur => new UserRepository
                    {
                        UserId = ur.UserId
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (repository == null) return NotFound();

            return repository;
        }

        [HttpGet("{Id}/users")]
        public async Task<ActionResult<List<RepoUserDto>>> GetRepositoryUsersList(int Id)
        {
            var users = await context.UsersRepositories
                .Where(ur => ur.RepositoryId == Id)
                .Include(ur => ur.User)
                .Select(ur => new RepoUserDto
                {
                    Id = ur.UserId,
                    Name = ur.User.Name,
                    Surname = ur.User.Surname,
                    RoleId = ur.User.RoleId,
                    RoleName = ur.User.Role.Name,
                }).ToListAsync();

            if (users == null) return NotFound();

            return Ok(users);
        }
    }
}