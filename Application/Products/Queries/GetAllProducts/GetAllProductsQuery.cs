using DecoApp.Application.Products.DTOs;
using MediatR;

namespace DecoApp.Application.Products.Queries.GetAllProducts
{
    public record GetAllProductsQuery() : IRequest<IEnumerable<ProductDto>>;
}
