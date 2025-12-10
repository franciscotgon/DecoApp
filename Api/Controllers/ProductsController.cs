using DecoApp.Application.Products.Commands.CreateProduct;
using DecoApp.Application.Products.Commands.DeleteProduct;
using DecoApp.Application.Products.Commands.UpdateProduct;
using DecoApp.Application.Products.DTOs;
using DecoApp.Application.Products.Queries.GetAllProducts;
using DecoApp.Application.Products.Queries.GetProductById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DecoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll(CancellationToken cancellationToken)
        {
            var products = await _mediator.Send(new GetAllProductsQuery(), cancellationToken);
            return Ok(products);
        }

        // GET: api/products/{id}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDto>> GetById(int id, CancellationToken cancellationToken)
        {
            var product = await _mediator.Send(new GetProductByIdQuery(id), cancellationToken);
            return Ok(product);
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateProductDto dto, CancellationToken cancellationToken)
        {
            var command = new CreateProductCommand(dto);
            var id = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        // PUT: api/products/{id}
        [HttpPut("{id:int}")]
        public async Task<ActionResult<int>> Update(int id, [FromBody] UpdateProductDto dto, CancellationToken cancellationToken)
        {
            if (id != dto.Id)
                return BadRequest("El Id de la URL y del DTO no coinciden.");

            var command = new UpdateProductCommand(dto);
            var updatedId = await _mediator.Send(command, cancellationToken);
            return Ok(updatedId);
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            var command = new DeleteProductCommand(id);
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }
    }
}
