namespace DecoApp.Domain.Models
{
    public class Result
    {
        public bool Succeeded { get; set; }
        public string[] Errors { get; set; } = Array.Empty<string>();
        public string Message { get; set; } = string.Empty;

        public static Result Success(string message = "") => new() { Succeeded = true, Message = message };
        public static Result Failure(IEnumerable<string> errors) => new() { Succeeded = false, Errors = errors.ToArray() };
    }
}
