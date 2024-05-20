namespace API.Entities
{
    public class UserRepository
    {
        public int RepositoryId { get; set; }

        public virtual Repository Repository { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}