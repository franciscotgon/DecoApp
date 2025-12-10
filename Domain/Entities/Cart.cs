namespace DecoApp.Domain.Entities
{
    public class Cart
    {
        public int Id { get; set; }

        // Relación con usuario (Identity)
        public string UserId { get; set; } = null!;

        // Navigation
        public List<CartItem> Items { get; set; } = new();
    }

}
