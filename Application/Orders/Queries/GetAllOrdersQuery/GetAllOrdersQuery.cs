using DecoApp.Application.Orders.DTOs;
using MediatR;

namespace DecoApp.Application.Orders.Queries.GetAllOrdersQuery
{
    public record GetAllOrdersQuery : IRequest<IEnumerable<OrderSummaryDto>>;
}
