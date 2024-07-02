namespace API.DTOs
{
    public class CreateRepositoryDto
    {
        public int CreatorId { get; set; }
        public int CreatorRoleId { get; set; }
        public string Subject { get; set; }
    }
}