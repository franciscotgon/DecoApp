using MediatR;

namespace DecoApp.Application.Carts.Commands.DeleteCartItem
{
    public class DeleteCartItemCommand : IRequest<int>
    {
        public string UserId { get; set; } = default!;

        public int ProductId { get; set; }

        
    }
}
