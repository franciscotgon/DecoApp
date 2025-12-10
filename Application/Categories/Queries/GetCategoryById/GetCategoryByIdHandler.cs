using AutoMapper;
using DecoApp.Application.Common.Exceptions;
using DecoApp.Application.Categories.DTOs;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;


namespace DecoApp.Application.Categories.Queries.GetCategoryById
{
    public class GetCategoryByIdHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
    {
        private readonly IGenericRepository<Category> _repository;
        private readonly IMapper _mapper;

        public GetCategoryByIdHandler(IGenericRepository<Category> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            var category = await _repository.GetByIdAsync(request.Id, cancellationToken);
            
            if (category == null)
                throw new NotFoundException(nameof(Category), request.Id);
            
            var categorys = await _repository.GetAllAsync(cancellationToken);
            return _mapper.Map<CategoryDto>(category);
        }

    }
}
