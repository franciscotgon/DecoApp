using AutoMapper;
using DecoApp.Application.Common.Exceptions;
using DecoApp.Application.Products.DTOs;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Products.Queries.GetProductById
{
    public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDto>
    {
        private readonly IGenericRepository<Product> _repository;
        private readonly IMapper _mapper;

        public GetProductByIdQueryHandler(IGenericRepository<Product> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ProductDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var product = await _repository.GetByIdAsync(request.Id, cancellationToken);

            if (product == null)
                throw new NotFoundException(nameof(Product), request.Id);

            var products = await _repository.GetAllAsync(cancellationToken);
            return _mapper.Map<ProductDto>(product);
        }
    }
}
