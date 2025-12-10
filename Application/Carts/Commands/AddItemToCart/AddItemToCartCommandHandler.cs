using DecoApp.Application.Common.Exceptions;
using DecoApp.Application.Carts.DTOs;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Carts.Commands.AddItemToCart
{
    public class AddItemToCartCommandHandler : IRequestHandler<AddItemToCartCommand, int>
    {
        private readonly IGenericRepository<Cart> _cartRepo;
        private readonly IGenericRepository<CartItem> _cartItemRepo;
        private readonly IGenericRepository<Product> _productRepo;

        public AddItemToCartCommandHandler(
            IGenericRepository<Cart> cartRepo,
            IGenericRepository<CartItem> cartItemRepo,
            IGenericRepository<Product> productRepo)
        {
            _cartRepo = cartRepo;
            _cartItemRepo = cartItemRepo;
            _productRepo = productRepo;
        }

        public async Task<int> Handle(AddItemToCartCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;

            // 1. Validación básica
            if (dto.Quantity <= 0)
                throw new ArgumentException("Quantity must be at least 1.");

            // 2. Verificar producto
            var product = await _productRepo.GetByIdAsync(dto.ProductId, cancellationToken);
            if (product == null)
                throw new NotFoundException(nameof(Product), dto.ProductId);

            if (product.Stock < dto.Quantity)
                throw new ArgumentException("Insufficient stock.");

            // 3. Buscar carrito activo del usuario
            var cart = (await _cartRepo
                .FindAsync(c => c.UserId == dto.UserId, cancellationToken))
                .FirstOrDefault();

            // 4. Si no existe carrito —> crearlo
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = dto.UserId,
                    Items = new List<CartItem>()
                };

                await _cartRepo.AddAsync(cart, cancellationToken);
                await _cartRepo.SaveChangesAsync(cancellationToken);
            }

            // 5. Buscar si el producto YA está en el carrito
            var cartItem = cart.Items.FirstOrDefault(i => i.ProductId == dto.ProductId);

            if (cartItem == null)
            {
                // 6. Crear un nuevo item
                cartItem = new CartItem
                {
                    CartId = cart.Id,
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity,
                };

                await _cartItemRepo.AddAsync(cartItem, cancellationToken);
            }
            else
            {
                // 7. El producto ya existe → sumar cantidad
                var newQuantity = cartItem.Quantity + dto.Quantity;

                if (newQuantity > product.Stock)
                    throw new ArgumentException("No hay stock suficiente para agregar más.");

                cartItem.Quantity = newQuantity;

                _cartItemRepo.Update(cartItem);
            }

            // 8. Guardar cambios
            await _cartItemRepo.SaveChangesAsync(cancellationToken);

            return cart.Id;   // devolvemos el ID del carrito
        }
    }
}
