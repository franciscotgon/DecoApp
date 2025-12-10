using MediatR;

namespace DecoApp.Application.Categories.Commands.DeleteCategory
{
    public record DeleteCategoryCommand(int Id) : IRequest<Unit>;

}
