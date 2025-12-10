using MediatR;
using DecoApp.Application.Carts.DTOs;

namespace DecoApp.Application.Carts.Commands.UpdateCartItem
{
    public record UpdateCartItemCommand : IRequest<int>
    {
        public UpdateCartItemDto Dto { get; set; } = default!;
    }

}
