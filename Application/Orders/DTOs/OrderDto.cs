namespace DecoApp.Application.Orders.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }

        public string UserId { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public decimal TotalAmount { get; set; }

        public string? Notes { get; set; }

        public List<OrderItemDto> Items { get; set; } = new();

        public decimal CalculatedTotal => Items.Sum(i => i.Subtotal);
    }
}
