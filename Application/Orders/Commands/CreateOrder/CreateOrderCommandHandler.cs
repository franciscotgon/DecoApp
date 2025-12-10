using DecoApp.Application.Common.Exceptions;
using DecoApp.Application.Orders.DTOs;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, int>
    {
        private readonly IGenericRepository<Cart> _cartRepo;
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<OrderItem> _orderItemRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<CartItem> _cartItemRepo;

        public CreateOrderCommandHandler(
            IGenericRepository<Cart> cartRepo,
            IGenericRepository<Order> orderRepo,
            IGenericRepository<OrderItem> orderItemRepo,
            IGenericRepository<Product> productRepo,
            IGenericRepository<CartItem> cartItemRepo)
        {
            _cartRepo = cartRepo;
            _orderRepo = orderRepo;
            _orderItemRepo = orderItemRepo;
            _productRepo = productRepo;
            _cartItemRepo = cartItemRepo;
        }

        public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;

            // 1. Search for the user's cart
            var cart = (await _cartRepo.FindAsync(c => c.UserId == dto.UserId, cancellationToken))
                .FirstOrDefault();

            if (cart == null)
                throw new ArgumentException("Cart not found");

            cart.Items = (await _cartItemRepo.FindAsync(ci => ci.CartId == cart.Id, cancellationToken)).ToList();

            if (cart.Items.Count == 0)
                throw new ArgumentException("Cart is empty.");

            // 2. Create the Order
            var order = new Order
            {
                UserId = dto.UserId,
                CreatedAt = DateTime.UtcNow,
                Notes = dto.Notes,
                TotalAmount = 0,
                Items = new List<OrderItem>()
            };

            await _orderRepo.AddAsync(order, cancellationToken);
            await _orderRepo.SaveChangesAsync(cancellationToken);

            decimal total = 0;

            // 3. Create OrderItems
            foreach (var item in cart.Items)
            {
                var product = await _productRepo.GetByIdAsync(item.ProductId, cancellationToken);
                if (product == null)
                    throw new NotFoundException(nameof(Product), item.ProductId);

                var oi = new OrderItem
                {
                    OrderId = order.Id,
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                };

                total += oi.UnitPrice * oi.Quantity;

                await _orderItemRepo.AddAsync(oi, cancellationToken);
            }

            // 4. Update total
            order.TotalAmount = total;
            _orderRepo.Update(order);
            await _orderRepo.SaveChangesAsync(cancellationToken);

            // 5. Empty the cart
            foreach (var ci in cart.Items)
                _cartItemRepo.Remove(ci);

            await _cartItemRepo.SaveChangesAsync(cancellationToken);

            return order.Id;
        }
    }
}
