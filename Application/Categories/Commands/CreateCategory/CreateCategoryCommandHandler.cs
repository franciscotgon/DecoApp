using Domain.Interfaces;
using DecoApp.Domain.Entities;
using MediatR;

namespace DecoApp.Application.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, int>
    {
        private readonly IGenericRepository<Category> _repo;
        public CreateCategoryCommandHandler(IGenericRepository<Category> repo)
        {
            _repo = repo;
        }
        public async Task<int> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;

            // 1. Validacion rapida.
            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Category name is required.");

            if (dto.Name.Length > 100)
                throw new ArgumentException("Category name cannot exceed 100 characters.");

            // 2. Map entity using dto.
            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description
            };
            // 3. Save
            await _repo.AddAsync(category);
            await _repo.SaveChangesAsync();

            return category.Id;

        }
    }
}
    

