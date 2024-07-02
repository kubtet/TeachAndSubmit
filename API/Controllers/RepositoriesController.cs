using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
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

        [HttpPost("create")]
        public async Task<ActionResult<Repository>> CreateRepository(CreateRepositoryDto input)
        {
            if (input == null || input.CreatorRoleId != (int)SystemRole.TEACHER || string.IsNullOrWhiteSpace(input.Subject))
            {
                return BadRequest();
            }

            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                var repository = new Repository
                {
                    Subject = input.Subject,
                    UserRepositories = new List<UserRepository>()
                };

                await context.Repositories.AddAsync(repository);
                await context.SaveChangesAsync();

                var userRepository = new UserRepository
                {
                    RepositoryId = repository.Id,
                    UserId = input.CreatorId,
                };

                await context.UsersRepositories.AddAsync(userRepository);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();

                return Ok(repository);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "An error occurred while creating the repository and user repository. " + ex.Message);
            }
        }
    }
}