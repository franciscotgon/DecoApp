using AutoMapper;
using DecoApp.Application.Orders.DTOs;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Orders.Queries.GetAllOrdersQuery
{
    public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQuery, IEnumerable<OrderSummaryDto>>
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IMapper _mapper;

        public GetAllOrdersQueryHandler(IGenericRepository<Order> orderRepo, IMapper mapper)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderSummaryDto>> Handle(GetAllOrdersQuery request, CancellationToken ct)
        {
            var orders = await _orderRepo.GetAllAsync(ct);
            return _mapper.Map<IEnumerable<OrderSummaryDto>>(orders);
        }
    }
}
