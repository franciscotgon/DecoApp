namespace DecoApp.Application.Carts.DTOs
{
    public class SyncCartDto
    {
        public string UserId { get; set; } = null!;
        public List<SyncCartItemDto> Items { get; set; } = new();
    }
}
