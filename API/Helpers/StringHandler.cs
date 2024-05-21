using System.Globalization;

namespace API.Helpers
{
    public class StringHandler
    {
        public static string CapitalizeFirstLetter(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return "";
            }

            input = input.Trim();

            string[] words = input.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            for (int i = 0; i < words.Length; i++)
            {
                if (words[i].Length > 0)
                {
                    words[i] = char.ToUpper(words[i][0], CultureInfo.InvariantCulture) + words[i].Substring(1).ToLower();
                }
            }

            return string.Join(" ", words);
        }
    }
}