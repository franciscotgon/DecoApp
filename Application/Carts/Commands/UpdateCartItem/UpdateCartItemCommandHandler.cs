using DecoApp.Application.Carts.DTOs;
using DecoApp.Application.Carts.Commands.UpdateCartItem;
using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Carts.Commands.UpdateCartItem
{
    public class UpdateCartItemCommandHandler : IRequestHandler<UpdateCartItemCommand, int>
    {
        private readonly IGenericRepository<Cart> _cartRepo;
        private readonly IGenericRepository<CartItem> _cartItemRepo;
        private readonly IGenericRepository<Product> _productRepo;

        public UpdateCartItemCommandHandler(
            IGenericRepository<Cart> cartRepo,
            IGenericRepository<CartItem> cartItemRepo,
            IGenericRepository<Product> productRepo)
        {
            _cartRepo = cartRepo;
            _cartItemRepo = cartItemRepo;
            _productRepo = productRepo;
        }

        public async Task<int> Handle(UpdateCartItemCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;

            if (dto.Quantity < 0)
                throw new ArgumentException("Quantity cannot be negative.");

            // 1. Buscar carrito
            var cart = (await _cartRepo.FindAsync(c => c.UserId == dto.UserId, cancellationToken))
                .FirstOrDefault();

            if (cart == null)
                throw new NotFoundException("Cart not found", dto.UserId);

            // 2. Buscar producto
            var product = await _productRepo.GetByIdAsync(dto.ProductId, cancellationToken);
            if (product == null)
                throw new NotFoundException(nameof(Product), dto.ProductId);

            // 3. Buscar item
            var item = cart.Items.FirstOrDefault(i => i.ProductId == dto.ProductId);

            if (item == null)
                throw new NotFoundException(nameof(CartItem), dto.ProductId);

            // 4. Si Quantity == 0 → eliminar item
            if (dto.Quantity == 0)
            {
                _cartItemRepo.Remove(item);
                await _cartItemRepo.SaveChangesAsync(cancellationToken);

                return cart.Id;
            }

            // 5. Validar stock
            if (dto.Quantity > product.Stock)
                throw new ArgumentException("Insufficient stock.");

            // 6. Actualizar cantidad
            item.Quantity = dto.Quantity;

            _cartItemRepo.Update(item);
            await _cartItemRepo.SaveChangesAsync(cancellationToken);

            return cart.Id;
        }
    }
}

