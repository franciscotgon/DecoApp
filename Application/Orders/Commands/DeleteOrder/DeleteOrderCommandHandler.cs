using DecoApp.Application.Common.Exceptions;
using DecoApp.Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Orders.Commands.DeleteOrder
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand, int>
    {
        private readonly IGenericRepository<Order> _orderRepo;

        public DeleteOrderCommandHandler(IGenericRepository<Order> orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public async Task<int> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepo.GetByIdAsync(request.Id, cancellationToken);

            if (order == null)
                throw new NotFoundException(nameof(Order), request.Id);

            _orderRepo.Remove(order);
            await _orderRepo.SaveChangesAsync(cancellationToken);

            return request.Id;
        }
    }
}

