using DecoApp.Domain.Entities;
using DecoApp.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DecoApp.Infrastructure.Seeders
{
    public static class ProductSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext db)
        {
            // Si ya hay categorías o productos, no seedear nada
            if (await db.Categories.AnyAsync() || await db.Products.AnyAsync())
                return;

            // Crear categorías
            var categories = new List<Category>
        {
            new Category { Name = "Audio", Description = "Productos de audio" },
            new Category { Name = "Periféricos", Description = "Teclados, mouse y accesorios" }
        };

            await db.Categories.AddRangeAsync(categories);
            await db.SaveChangesAsync();

            // Crear productos asignando CategoryId
            var products = new List<Product>
        {
            new Product
            {
                Name = "Auriculares Bluetooth",
                Description = "Auriculares inalámbricos con cancelación de ruido.",
                Price = 49.99m,
                Stock = 20,
                ImageUrl = "https://picsum.photos/seed/1/400",
                IsActive = true,
                CategoryId = categories.First(c => c.Name == "Audio").Id
            },
            new Product
            {
                Name = "Mouse Gamer RGB",
                Description = "Mouse ergonómico de alta precisión.",
                Price = 29.99m,
                Stock = 35,
                ImageUrl = "https://picsum.photos/seed/2/400",
                IsActive = true,
                CategoryId = categories.First(c => c.Name == "Periféricos").Id
            },
            new Product
            {
                Name = "Teclado Mecánico",
                Description = "Teclado mecánico retroiluminado.",
                Price = 69.99m,
                Stock = 15,
                ImageUrl = "https://picsum.photos/seed/3/400",
                IsActive = true,
                CategoryId = categories.First(c => c.Name == "Periféricos").Id
            }
        };

            await db.Products.AddRangeAsync(products);
            await db.SaveChangesAsync();
        }
    }
}
