using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Categories.Commands.DeleteCategory
{
    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Unit>
    {
        private readonly IGenericRepository<Category> _repository;

        public DeleteCategoryCommandHandler(IGenericRepository<Category> repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            // Buscar la categoría por Id
            var category = await _repository.GetByIdAsync(request.Id, cancellationToken);
            
            if (category == null)
                throw new NotFoundException(nameof(Category), request.Id);
            
            // Soft delete: desactivar la categoría

            //category.IsActive = false;
            //await _repository.UpdateAsync(category, cancellationToken);
            
            // Hard delete
            _repository.Remove(category);
            await _repository.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}
