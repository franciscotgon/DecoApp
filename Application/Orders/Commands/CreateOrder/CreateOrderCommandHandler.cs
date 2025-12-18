using AutoMapper;
using DecoApp.Application.Common.Exceptions;
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
        private readonly IMapper _mapper;

        public CreateOrderCommandHandler(
            IGenericRepository<Cart> cartRepo,
            IGenericRepository<Order> orderRepo,
            IGenericRepository<OrderItem> orderItemRepo,
            IGenericRepository<Product> productRepo,
            IGenericRepository<CartItem> cartItemRepo,
            IMapper mapper)
        {
            _cartRepo = cartRepo;
            _orderRepo = orderRepo;
            _orderItemRepo = orderItemRepo;
            _productRepo = productRepo;
            _cartItemRepo = cartItemRepo;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            // 1. Mapeo inicial
            var order = _mapper.Map<Order>(request.Dto);
            order.CreatedAt = DateTime.UtcNow; // Asegúrate de setear la fecha

            // 2. Buscar el carrito
            var cart = (await _cartRepo.FindAsync(c => c.UserId == order.UserId, cancellationToken))
                        .FirstOrDefault();

            if (cart == null) throw new ArgumentException("Cart not found");

            var cartItems = (await _cartItemRepo.FindAsync(ci => ci.CartId == cart.Id, cancellationToken)).ToList();

            if (!cartItems.Any()) throw new ArgumentException("Cart is empty.");

            decimal totalAmount = 0;

            // 3. Procesar ítems
            foreach (var cartItem in cartItems)
            {
                var product = await _productRepo.GetByIdAsync(cartItem.ProductId, cancellationToken);

                if (product == null) throw new NotFoundException(nameof(Product), cartItem.ProductId);

                if (product.Stock < cartItem.Quantity)
                    throw new Exception($"Stock insuficiente para {product.Name}. Disponibles: {product.Stock}");

                // Actualizamos stock
                product.Stock -= cartItem.Quantity;
                _productRepo.Update(product);

                // Creamos OrderItem
                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = cartItem.Quantity,
                    UnitPrice = product.Price
                };

                order.Items.Add(orderItem);
                totalAmount += (orderItem.UnitPrice * orderItem.Quantity);
            }

            order.TotalAmount = totalAmount;

            // 4. Persistencia
            await _orderRepo.AddAsync(order, cancellationToken);

            // 5. Limpieza del carrito
            foreach (var ci in cartItems)
                _cartItemRepo.Remove(ci);

            await _orderRepo.SaveChangesAsync(cancellationToken);

            return order.Id;
        }
    }
}
