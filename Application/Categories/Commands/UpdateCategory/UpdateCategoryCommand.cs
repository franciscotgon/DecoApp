using DecoApp.Application.Categories.DTOs;
using MediatR;


namespace DecoApp.Application.Categories.Commands.UpdateCategory
{
    public record UpdateCategoryCommand(UpdateCategoryDto Dto) : IRequest<int>;

}
