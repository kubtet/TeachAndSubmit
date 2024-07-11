namespace API.Entities
{
    public class Task
    {
        public int Id { get; set; }

        public int RepositoryId { get; set; }

        public Repository Repository { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime DeadlineDate { get; set; }
    }
}