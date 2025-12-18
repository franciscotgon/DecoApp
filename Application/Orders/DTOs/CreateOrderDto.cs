namespace DecoApp.Application.Orders.DTOs
{
    public class CreateOrderDto
    {
        public string UserId { get; set; } = null!;
        public string? Notes { get; set; }
        public List<CreateOrderItemDto> Items { get; set; } = new();
    }
}
