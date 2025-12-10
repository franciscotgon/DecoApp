using DecoApp.Application.Orders.DTOs;
using DecoApp.Application.Orders.Queries.GetOrderByUser;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Orders.Queries.GetOrdersByUser
{
    public class GetOrdersByUserQueryHandler : IRequestHandler<GetOrderByUserQuery, IEnumerable<OrderSummaryDto>>
    {
        private readonly IGenericRepository<Order> _orderRepo;

        public GetOrdersByUserQueryHandler(IGenericRepository<Order> orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public async Task<IEnumerable<OrderSummaryDto>> Handle(GetOrderByUserQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepo.FindAsync(o => o.UserId == request.UserId, cancellationToken);

            return orders.Select(o => new OrderSummaryDto
            {
                Id = o.Id,
                TotalAmount = o.TotalAmount,
                CreatedAt = o.CreatedAt
            });
        }
    }
}

