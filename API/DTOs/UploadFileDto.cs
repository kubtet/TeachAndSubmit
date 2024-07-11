namespace API.DTOs
{
    public class UploadFileDto
    {
        public int StudentId { get; set; }
        public int TaskId { get; set; }
        public IFormFile File { get; set; }
    }
}