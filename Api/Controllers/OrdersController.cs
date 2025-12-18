using DecoApp.Application.Orders.Commands.CreateOrder;
using DecoApp.Application.Orders.Commands.DeleteOrder;
using DecoApp.Application.Orders.Commands.UpdateOrder;
using DecoApp.Application.Orders.DTOs;
using DecoApp.Application.Orders.Queries.GetAllOrdersQuery;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderSummaryDto>>> GetAll(CancellationToken ct)
        {
            var orders = await _mediator.Send(new GetAllOrdersQuery(), ct);
            return Ok(orders);
        }
        // POST api/orders
        [HttpPost]
        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateOrderDto dto, CancellationToken ct)
        {
            // Esto coincide con: public record CreateOrderCommand(CreateOrderDto Dto)
            var id = await _mediator.Send(new CreateOrderCommand(dto), ct);
            return Ok(new { id });
        }

        // GET api/orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetById(int id, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetOrderByIdQuery { Id = id }, cancellationToken);

            if (result == null)
                return NotFound(new { message = $"No se encontró la orden con ID {id}" });

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
        // Generalmente las órdenes no se actualizan por completo, pero si lo necesitas:
        [HttpPut("{id}")]
        public async Task<ActionResult<int>> Update(int id, [FromBody] UpdateOrderCommand command, CancellationToken cancellationToken)
        {
            if (id != command.Id) return BadRequest(new { message = "ID mismatch" });

            var updatedId = await _mediator.Send(command, cancellationToken);
            return Ok(updatedId);
        }

        // DELETE api/orders/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> Delete(int id, CancellationToken cancellationToken)
        {
            var deletedId = await _mediator.Send(new DeleteOrderCommand { Id = id }, cancellationToken);
            return Ok(deletedId);
        }
    }
}