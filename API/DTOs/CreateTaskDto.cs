using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        public int RepositoryId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DeadlineDate { get; set; }
    }
}