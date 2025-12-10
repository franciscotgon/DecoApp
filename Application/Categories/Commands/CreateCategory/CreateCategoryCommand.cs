namespace DecoApp.Application.Categories.Commands.CreateCategory
{
    using MediatR;
    using DecoApp.Application.Categories.DTOs;
    public record CreateCategoryCommand(CreateCategoryDto Dto) : IRequest<int>;

}
