namespace API.DTOs
{
    public class HandleNotificationDto
    {
        public int StudentId { get; set; }
        public int RepositoryId { get; set; }
        public int NotificationId { get; set; }
        public bool Accepted { get; set; }
    }
}