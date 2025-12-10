using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Carts.Commands.DeleteCartItem
{
    public class RemoveCartItemCommandHandler : IRequestHandler<DeleteCartItemCommand, int>
    {
        private readonly IGenericRepository<Cart> _cartRepo;
        private readonly IGenericRepository<CartItem> _cartItemRepo;

        public RemoveCartItemCommandHandler(
            IGenericRepository<Cart> cartRepo,
            IGenericRepository<CartItem> cartItemRepo)
        {
            _cartRepo = cartRepo;
            _cartItemRepo = cartItemRepo;
        }

        public async Task<int> Handle(DeleteCartItemCommand request, CancellationToken cancellationToken)
        {
            // 1. Buscar carrito del usuario
            var cart = (await _cartRepo.FindAsync(c => c.UserId == request.UserId, cancellationToken))
                .FirstOrDefault();

            if (cart == null)
                throw new NotFoundException("Cart not found", request.UserId);

            // 2. Buscar item por ProductId
            var item = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);

            if (item == null)
                throw new NotFoundException(nameof(CartItem), request.ProductId);

            // 3. Eliminar item
            _cartItemRepo.Remove(item);

            // 4. Guardar cambios
            await _cartItemRepo.SaveChangesAsync(cancellationToken);

            return cart.Id;
        }
    }
}

