using DecoApp.Application.Orders.DTOs;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Orders.Queries.GetOrderById
{
    public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto?>
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<OrderItem> _orderItemRepo;
        private readonly IGenericRepository<Product> _productRepo;

        public GetOrderByIdQueryHandler(
            IGenericRepository<Order> orderRepo,
            IGenericRepository<OrderItem> orderItemRepo,
            IGenericRepository<Product> productRepo)
        {
            _orderRepo = orderRepo;
            _orderItemRepo = orderItemRepo;
            _productRepo = productRepo;
        }

        public async Task<OrderDto?> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
        {
            var order = await _orderRepo.GetByIdAsync(request.Id, cancellationToken);

            if (order == null)
                return null;

            
            var items = await _orderItemRepo.FindAsync(oi => oi.OrderId == order.Id, cancellationToken);
            order.Items = items.ToList();

            
            var dto = new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                CreatedAt = order.CreatedAt,
                TotalAmount = order.TotalAmount,
                Notes = order.Payment?.Notes,
                Items = new List<OrderItemDto>()
            };

            foreach (var item in order.Items)
            {
                var product = await _productRepo.GetByIdAsync(item.ProductId, cancellationToken);
                if (product == null)
                    continue;

                dto.Items.Add(new OrderItemDto
                {
                    ProductId = item.ProductId,
                    ProductName = product.Name,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice
                });
            }

            return dto;
        }
    }
}


