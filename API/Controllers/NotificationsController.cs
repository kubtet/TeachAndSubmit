using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class NotificationsController(Context context) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Notification>>> GetNotifications()
        {
            var notifications = await context.Notifications
                .Include(n => n.Teacher)
                .Include(n => n.Student)
                .Include(n => n.Repository)
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpGet("teacher/{id}")]
        public async Task<ActionResult<List<Notification>>> GetNotificationsForTeacher(int Id)
        {
            var notifications = await context.Notifications
                .Where(n => n.TeacherId == Id)
                .Include(n => n.Teacher)
                .Include(n => n.Student)
                .Include(n => n.Repository)
                .ToListAsync();

            if (notifications.Count > 0)
            {
                return Ok(notifications);
            }

            return NotFound();
        }

        [HttpPost("add")]
        public async Task<ActionResult<Notification>> AddNotification(AddNotificationDto input)
        {
            if (input == null)
            {
                return BadRequest("No input data");
            }

            var relatedRepository = await context.Repositories.FindAsync(input.RepositoryId);
            var relatedTeacher = await context.Users.FindAsync(input.TeacherId);
            var relatedStudent = await context.Users.FindAsync(input.StudentId);

            if (relatedRepository == null || relatedTeacher == null || relatedStudent == null)
            {
                return BadRequest("Related entity doesn't exist");
            }

            var notification = new Notification
            {
                StudentId = input.StudentId,
                TeacherId = input.TeacherId,
                RepositoryId = input.RepositoryId,
                Content = "wants to join the course",
            };

            await context.Notifications.AddAsync(notification);
            await context.SaveChangesAsync();

            return Ok(notification);
        }
    }
}