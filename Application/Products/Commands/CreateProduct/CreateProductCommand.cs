namespace DecoApp.Application.Products.Commands.CreateProduct
{
    using DecoApp.Application.Products.DTOs;
    using MediatR;

    public record CreateProductCommand(CreateProductDto Dto) : IRequest<int>;
}
