using DecoApp.Application.Orders.DTOs;
using MediatR;

namespace DecoApp.Application.Orders.Queries.GetOrderById
{
    public class GetOrderByIdQuery : IRequest<OrderDto?>
    {
        public int Id { get; set; }
    }
}
