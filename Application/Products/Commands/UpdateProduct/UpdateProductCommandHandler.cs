using AutoMapper;
using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, int>
    {
        private readonly IGenericRepository<Product> _repository;
        private readonly IMapper _mapper; 

        public UpdateProductCommandHandler(IGenericRepository<Product> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper; 
        }

        public async Task<int> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;
            var product = await _repository.GetByIdAsync(dto.Id, cancellationToken);

            if (product == null)
                throw new NotFoundException(nameof(Product), dto.Id);
            _mapper.Map(dto, product);

            // 3. Persistir los cambios
            _repository.Update(product);
            await _repository.SaveChangesAsync(cancellationToken);

            return product.Id;
        }
    }
}