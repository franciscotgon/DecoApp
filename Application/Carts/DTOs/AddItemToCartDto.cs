namespace DecoApp.Application.Carts.DTOs
{
    public class AddItemToCartDto
    {
        public string UserId { get; set; } = default!;
        public int ProductId { get; set; }

        public int Quantity { get; set; }
    }
}
