using DecoApp.Application.Carts.Commands.AddItemToCart;
using DecoApp.Application.Carts.Commands.DeleteCartItem;
using DecoApp.Application.Carts.Commands.UpdateCartItem;
using DecoApp.Application.Carts.DTOs;
using DecoApp.Application.Carts.Queries.GetCartByUser;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DecoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CartController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET api/cart/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<CartDto>> GetCart(string userId, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetCartByUserQuery { UserId = userId }, cancellationToken);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // POST api/cart/add
        [HttpPost("add")]
        public async Task<ActionResult<int>> Add(AddItemToCartDto dto, CancellationToken cancellationToken)
        {
            var cartId = await _mediator.Send(new AddItemToCartCommand { Dto = dto }, cancellationToken);
            return Ok(cartId);
        }

        // PUT api/cart/update
        [HttpPut("update")]
        public async Task<ActionResult<int>> Update(UpdateCartItemDto dto, CancellationToken cancellationToken)
        {
            var cartId = await _mediator.Send(new UpdateCartItemCommand { Dto = dto }, cancellationToken);
            return Ok(cartId);
        }

        // DELETE api/cart/remove
        [HttpDelete("remove")]
        public async Task<ActionResult<int>> Remove([FromQuery] string userId, [FromQuery] int productId, CancellationToken cancellationToken)
        {
            var cartId = await _mediator.Send(new DeleteCartItemCommand
            {
                UserId = userId,
                ProductId = productId
            }, cancellationToken);

            return Ok(cartId);
        }
    }
}

