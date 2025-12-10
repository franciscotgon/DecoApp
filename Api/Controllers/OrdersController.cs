using DecoApp.Application.Orders.Commands.CreateOrder;
using DecoApp.Application.Orders.Commands.DeleteOrder;
using DecoApp.Application.Orders.Commands.UpdateOrder;
using DecoApp.Application.Orders.DTOs;
using DecoApp.Application.Orders.Queries.GetOrderById;
using DecoApp.Application.Orders.Queries.GetOrderByUser;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DecoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST api/orders
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateOrderDto dto, CancellationToken cancellationToken)
        {
            var id = await _mediator.Send(new CreateOrderCommand(dto), cancellationToken);
            return Ok(id);
        }

        // GET api/orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetById(int id, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetOrderByIdQuery { Id = id }, cancellationToken);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // GET api/orders/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<OrderSummaryDto>>> GetByUser(string userId, CancellationToken cancellationToken)
        {
            var orders = await _mediator.Send(new GetOrderByUserQuery { UserId = userId }, cancellationToken);
            return Ok(orders);
        }

        // PUT api/orders/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<int>> Update(int id, UpdateOrderCommand dto, CancellationToken cancellationToken)
        {
            dto.Id = id;
            var updated = await _mediator.Send(dto, cancellationToken);
            return Ok(updated);
        }

        // DELETE api/orders/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> Delete(int id, CancellationToken cancellationToken)
        {
            var deleted = await _mediator.Send(new DeleteOrderCommand { Id = id }, cancellationToken);
            return Ok(deleted);
        }
    }
}

