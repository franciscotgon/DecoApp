using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, int>
    {
        private readonly IGenericRepository<Category> _repository;

        public UpdateCategoryCommandHandler(IGenericRepository<Category> repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;

            // 1. Buscar categoría
            var category = await _repository.GetByIdAsync(dto.Id, cancellationToken);

            if (category == null)
                throw new NotFoundException(nameof(Category), dto.Id);

            // 2. Validación manual
            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Category Name is required.");

            if (dto.Name.Length > 100)
                throw new ArgumentException("Category Name is too long.");

            // 3. Actualizar propiedades
            category.Name = dto.Name;
            category.Description = dto.Description;

            // 4. Guardar cambios
            _repository.Update(category);
            await _repository.SaveChangesAsync(cancellationToken);

            return category.Id;
        }
    }
}

