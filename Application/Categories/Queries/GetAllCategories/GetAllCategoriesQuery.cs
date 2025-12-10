using MediatR;
using DecoApp.Application.Categories.DTOs;

namespace DecoApp.Application.Categories.Queries.GetAllCategories
{
    public record GetAllCategoriesQuery(): IRequest<IEnumerable<CategoryDto>>;

}
