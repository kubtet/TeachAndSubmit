namespace API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Token { get; set; }
        public string RoleName { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}