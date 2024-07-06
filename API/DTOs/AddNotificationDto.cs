using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class AddNotificationDto
    {
        [Required]
        public int StudentId { get; set; }
        [Required]
        public int TeacherId { get; set; }
        [Required]
        public int RepositoryId { get; set; }
    }
}