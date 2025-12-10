using DecoApp.Application.Products.DTOs;
using MediatR;

namespace DecoApp.Application.Products.Queries.GetProductById
{
    public record GetProductByIdQuery(int Id) : IRequest<ProductDto>;
}