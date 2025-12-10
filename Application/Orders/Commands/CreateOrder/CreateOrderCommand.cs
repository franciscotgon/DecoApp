using DecoApp.Application.Orders.DTOs;
using MediatR;

namespace DecoApp.Application.Orders.Commands.CreateOrder
{
    public record CreateOrderCommand(CreateOrderDto Dto) : IRequest<int>;

}
