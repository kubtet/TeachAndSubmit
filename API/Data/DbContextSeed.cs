using System.Text.Json;
using API.Entities;

namespace API.Data
{
    public class DbContextSeed
    {
        public static async System.Threading.Tasks.Task SeedAsync(Context context)
        {
            if (!context.Roles.Any())
            {
                var rolesData = File.ReadAllText("./Data/SeedData/roles.json");
                var roles = JsonSerializer.Deserialize<List<Role>>(rolesData);
                context.Roles.AddRange(roles);
            }

            if (!context.Users.Any())
            {
                var usersData = File.ReadAllText("./Data/SeedData/users.json");
                var users = JsonSerializer.Deserialize<List<User>>(usersData);
                context.Users.AddRange(users);
            }

            if (!context.Tasks.Any())
            {
                var tasksData = File.ReadAllText("./Data/SeedData/tasks.json");
                var tasks = JsonSerializer.Deserialize<List<Entities.Task>>(tasksData);
                context.Tasks.AddRange(tasks);
            }

            if (!context.Repositories.Any())
            {
                var repositoriesData = File.ReadAllText("./Data/SeedData/repositories.json");
                var repositories = JsonSerializer.Deserialize<List<Repository>>(repositoriesData);
                context.Repositories.AddRange(repositories);
            }

            if (!context.UsersRepositories.Any())
            {
                var userRepositoriesData = File.ReadAllText("./Data/SeedData/usersrepositories.json");
                var userRepositories = JsonSerializer.Deserialize<List<UserRepository>>(userRepositoriesData);
                context.UsersRepositories.AddRange(userRepositories);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}