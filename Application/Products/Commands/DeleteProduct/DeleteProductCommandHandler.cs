using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Unit>
    {
        private readonly IGenericRepository<Product> _repository;

        public DeleteProductCommandHandler(IGenericRepository<Product> repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            // Buscar el producto por Id
            var product = await _repository.GetByIdAsync(request.Id, cancellationToken);

            if (product == null)
                throw new NotFoundException(nameof(Product), request.Id);

            // Soft delete: desactivar el producto

            //product.IsActive = false;
            //await _repository.UpdateAsync(product, cancellationToken);

            // Hard delete
            _repository.Remove(product);
            await _repository.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
