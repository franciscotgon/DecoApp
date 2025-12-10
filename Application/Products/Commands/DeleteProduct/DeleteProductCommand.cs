using MediatR;

namespace DecoApp.Application.Products.Commands.DeleteProduct
{
    public record DeleteProductCommand(int Id) : IRequest<Unit>;
}
