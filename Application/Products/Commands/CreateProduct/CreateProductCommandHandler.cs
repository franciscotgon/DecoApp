using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
    {
        private readonly IGenericRepository<Product> _repo;

        public CreateProductCommandHandler(IGenericRepository<Product> repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;

            // 1. Validación rápida (defensa)
            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Product Name is required.");

            // 2. Map entity using dto
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Stock = dto.Stock,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.ImageUrl,
                IsActive = dto.IsActive
            };

            // 3. Save
            await _repo.AddAsync(product);
            await _repo.SaveChangesAsync();

            return product.Id;
        }
    }
}
