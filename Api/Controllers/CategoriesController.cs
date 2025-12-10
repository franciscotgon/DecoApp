using DecoApp.Application.Categories.Commands.CreateCategory;
using DecoApp.Application.Categories.Commands.DeleteCategory;
using DecoApp.Application.Categories.Commands.UpdateCategory;
using DecoApp.Application.Categories.DTOs;
using DecoApp.Application.Categories.Queries.GetAllCategories;
using DecoApp.Application.Categories.Queries.GetCategoryById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DecoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll(CancellationToken cancellationToken)
        {
            var categories = await _mediator.Send(new GetAllCategoriesQuery(), cancellationToken);
            return Ok(categories);
        }
        // GET: api/categories/{id}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CategoryDto>> GetById(int id, CancellationToken cancellationToken)
        {
            var category = await _mediator.Send(new GetCategoryByIdQuery(id), cancellationToken);
            return Ok(category);

        }
        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateCategoryDto dto, CancellationToken cancellationToken)
        {
            var command = new CreateCategoryCommand(dto);
            var id = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        // PUT: api/categories/{id}
        [HttpPut("{id:int}")]
        public async Task<ActionResult<int>> Update(int id, [FromBody] UpdateCategoryDto dto, CancellationToken cancellationToken)
        {
            if (id != dto.Id)
                return BadRequest("El Id de la URL y del DTO no coinciden.");
            var command = new UpdateCategoryCommand(dto);
            var updatedId = await _mediator.Send(command, cancellationToken);
            return Ok(updatedId);
        }
        // DELETE: api/categories/{id}
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            var command = new DeleteCategoryCommand(id);
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }
    }
}
