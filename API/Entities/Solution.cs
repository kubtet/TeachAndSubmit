namespace API.Entities
{
    public class Solution
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public int StudentId { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public bool Submitted { get; set; } = false;
    }
}