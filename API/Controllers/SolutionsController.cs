using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SolutionsController(Context context, IWebHostEnvironment environment) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Solution>>> GetSolutions()
        {
            var solutions = await context.Solutions.ToListAsync();
            return Ok(solutions);
        }

        [HttpPost("upload")]
        public async Task<ActionResult> UploadFile([FromForm] UploadFileDto input)
        {
            if (input.File == null || input.File.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var student = await context.Users.FirstOrDefaultAsync(x => x.Id == input.StudentId);
            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var task = await context.Tasks.FirstOrDefaultAsync(x => x.Id == input.TaskId);
            if (task == null)
            {
                return NotFound("Task not found.");
            }

            var repository = await context.Repositories.FirstOrDefaultAsync(x => x.Id == task.RepositoryId);
            if (repository == null)
            {
                return NotFound("Repository not found.");
            }

            var teacher = await context.UsersRepositories
                .Where(ur => ur.RepositoryId == task.RepositoryId && ur.User.RoleId == (int)SystemRole.TEACHER)
                .Select(ur => ur.User)
                .FirstOrDefaultAsync();
            if (teacher == null)
            {
                return NotFound("Teacher not found.");
            }

            var courseDirectoryName = $"{teacher.Surname}_{repository.Subject}";
            var studentDirectoryName = $"{student.Surname}_{student.Name}";
            var taskDirectoryName = $"{task.Name}";

            var courseDirectoryPath = Path.Combine(environment.WebRootPath, "TeachAndSubmit", courseDirectoryName);
            var studentDirectoryPath = Path.Combine(courseDirectoryPath, studentDirectoryName);
            var taskDirectoryPath = Path.Combine(studentDirectoryPath, taskDirectoryName);

            if (!Directory.Exists(taskDirectoryPath))
            {
                Directory.CreateDirectory(taskDirectoryPath);
            }

            var filePath = Path.Combine(taskDirectoryPath, input.File.FileName);
            var directoryInfo = new DirectoryInfo(taskDirectoryPath);
            foreach (var file in directoryInfo.GetFiles())
            {
                file.Delete();
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await input.File.CopyToAsync(stream);
            }

            var existingSolution = await context.Solutions
                .Where(s => s.TaskId == input.TaskId && s.StudentId == input.StudentId)
                .FirstOrDefaultAsync();

            if (existingSolution != null)
            {
                context.Solutions.Remove(existingSolution);
            }

            var solution = new Solution
            {
                StudentId = input.StudentId,
                TaskId = input.TaskId,
                FileName = input.File.FileName,
                FilePath = filePath,
                Submitted = true,
                UploadDate = DateTime.Now,
            };

            await context.Solutions.AddAsync(solution);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("download")]
        public ActionResult DownloadFile([FromQuery] string filePath)
        {
            if (string.IsNullOrEmpty(filePath) || !System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var fileName = Path.GetFileName(filePath);

            return File(fileBytes, "application/octet-stream", fileName);
        }
    }
}