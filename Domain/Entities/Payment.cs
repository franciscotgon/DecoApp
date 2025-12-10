namespace DecoApp.Domain.Entities
{
    public class Payment
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }
        public string Method { get; set; } = null!;   // "CreditCard", "PayPal", etc.
        public DateTime PaidAt { get; set; } = DateTime.UtcNow;
        public bool IsSuccessful { get; set; }

        // Foreign Key
        public int OrderId { get; set; }

        // Navigation
        public Order Order { get; set; } = null!;
        public string? Notes { get; set; }
    }
}
