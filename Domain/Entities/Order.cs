namespace DecoApp.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public decimal TotalAmount { get; set; }

        // Relationship with Identity User
        public string UserId { get; set; } = null!;

        // Navigation
        public List<OrderItem> Items { get; set; } = new();
        public Payment? Payment { get; set; }
        public string? Notes { get; set; }
    }
}
