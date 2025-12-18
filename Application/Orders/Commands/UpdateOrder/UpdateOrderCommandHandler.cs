using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Orders.Commands.UpdateOrder
{
    public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand, int>
    {
        private readonly IGenericRepository<Order> _orderRepo;

        public UpdateOrderCommandHandler(IGenericRepository<Order> orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public async Task<int> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepo.GetByIdAsync(request.Id, cancellationToken);

            if (order == null)
                throw new NotFoundException(nameof(Order), request.Id);

            order.Notes = request.Notes;

            _orderRepo.Update(order);
            await _orderRepo.SaveChangesAsync(cancellationToken);

            return order.Id;
        }
    }
}

