using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Carts.Commands.SyncCart
{
    public class SyncCartCommandHandler : IRequestHandler<SyncCartCommand, int>
    {
        private readonly IGenericRepository<Cart> _cartRepo;
        private readonly IGenericRepository<CartItem> _cartItemRepo;

        public SyncCartCommandHandler(IGenericRepository<Cart> cartRepo, IGenericRepository<CartItem> cartItemRepo)
        {
            _cartRepo = cartRepo;
            _cartItemRepo = cartItemRepo;
        }

        public async Task<int> Handle(SyncCartCommand request, CancellationToken cancellationToken)
        {
            // 2. Buscar o Crear el carrito para el usuario
            var cart = (await _cartRepo.FindAsync(c => c.UserId == request.Dto.UserId, cancellationToken)).FirstOrDefault();

            if (cart == null)
            {
                cart = new Cart { UserId = request.Dto.UserId };
                await _cartRepo.AddAsync(cart, cancellationToken);
                // Guardamos aquí para obtener el ID generado por la DB antes de agregar los items
                await _cartRepo.SaveChangesAsync(cancellationToken);
            }

            // 3. Obtener y remover los ítems viejos
            // Es mejor traerlos todos de una vez para limpiar
            var oldItems = await _cartItemRepo.FindAsync(ci => ci.CartId == cart.Id, cancellationToken);
            foreach (var item in oldItems)
            {
                _cartItemRepo.Remove(item);
            }

            // 4. Insertar ítems nuevos
            foreach (var itemDto in request.Dto.Items)
            {
                var newItem = new CartItem
                {
                    CartId = cart.Id,
                    ProductId = itemDto.ProductId,
                    Quantity = itemDto.Quantity
                };
                await _cartItemRepo.AddAsync(newItem, cancellationToken);
            }

            // 5. Un solo SaveChanges final para los items (más eficiente)
            await _cartItemRepo.SaveChangesAsync(cancellationToken);

            return cart.Id; // Devolvemos el ID del carrito sincronizado
        }
    }
}