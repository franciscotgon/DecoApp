namespace DecoApp.Application.Orders.DTOs
{
    public class OrderSummaryDto
    {
        public int Id { get; set; }

        public decimal TotalAmount { get; set; }

        public DateTime CreatedAt { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string Status { get; set; } = "Pendiente";
    }
}

