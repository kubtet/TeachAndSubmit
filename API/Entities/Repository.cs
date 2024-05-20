namespace API.Entities
{
    public class Repository
    {
        public int Id { get; set; }

        public string Subject { get; set; }

        public virtual List<UserRepository> UserRepositories { get; set; }
    }
}