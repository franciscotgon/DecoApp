using DecoApp.Application.Carts.DTOs;
using DecoApp.Application.Carts.Queries.GetCartByUser;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Carts.Queries.GetCartByUser
{
    public class GetCartByUserQueryHandler : IRequestHandler<GetCartByUserQuery, CartDto?>
    {
        private readonly IGenericRepository<Cart> _cartRepo;
        private readonly IGenericRepository<Product> _productRepo;

        public GetCartByUserQueryHandler(
            IGenericRepository<Cart> cartRepo,
            IGenericRepository<Product> productRepo)
        {
            _cartRepo = cartRepo;
            _productRepo = productRepo;
        }

        public async Task<CartDto?> Handle(GetCartByUserQuery request, CancellationToken cancellationToken)
        {
            // 1. Obtener carrito del usuario
            var cart = (await _cartRepo.FindAsync(c => c.UserId == request.UserId, cancellationToken))
                .FirstOrDefault();

            if (cart == null)
                return null;

            // 2. Mapear items manualmente
            var items = new List<CartItemDto>();

            foreach (var item in cart.Items)
            {
                var product = await _productRepo.GetByIdAsync(item.ProductId, cancellationToken);

                if (product == null)
                    continue; // el producto fue borrado

                items.Add(new CartItemDto
                {
                    ProductId = item.ProductId,
                    ProductName = product.Name,
                    Price = product.Price,
                    Quantity = item.Quantity
                });
            }

            // 3. Construir CartDto
            return new CartDto
            {
                CartId = cart.Id,
                UserId = cart.UserId,
                Items = items
            };
        }
    }
}

