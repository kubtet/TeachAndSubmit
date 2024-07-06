namespace API.Entities
{
    public class Notification 
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public int StudentId { get; set; }
        public int RepositoryId { get; set; }
        public string Content { get; set; }
        public virtual User Student { get; set; }
        public virtual User Teacher { get; set; }
        public virtual Repository Repository { get; set; }
    }
}