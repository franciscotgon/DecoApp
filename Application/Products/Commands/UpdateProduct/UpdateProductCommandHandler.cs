using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, int>
    {
        private readonly IGenericRepository<Product> _repository;

        public UpdateProductCommandHandler(IGenericRepository<Product> repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;

            var product = await _repository.GetByIdAsync(dto.Id, cancellationToken);

            if (product == null)
                throw new NotFoundException(nameof(Product), dto.Id);

            // Actualizar propiedades
            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.Stock = dto.Stock;
            product.ImageUrl = dto.ImageUrl;
            product.CategoryId = dto.CategoryId;

            _repository.Update(product);
            await _repository.SaveChangesAsync(cancellationToken);

            return product.Id;
        }
    }
}
