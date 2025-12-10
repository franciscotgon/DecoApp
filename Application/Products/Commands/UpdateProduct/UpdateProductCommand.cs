using DecoApp.Application.Products.DTOs;
using MediatR;

namespace DecoApp.Application.Products.Commands.UpdateProduct
{
    public record UpdateProductCommand(UpdateProductDto Dto) : IRequest<int>;
}
