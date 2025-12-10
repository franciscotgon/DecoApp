namespace DecoApp.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        public decimal Price { get; set; }
        public int Stock { get; set; }

        public string? ImageUrl { get; set; }

        public bool IsActive { get; set; }

        // Foreign Key
        public int CategoryId { get; set; }

        // Navigation
        public Category Category { get; set; } = null!;
    }

}
