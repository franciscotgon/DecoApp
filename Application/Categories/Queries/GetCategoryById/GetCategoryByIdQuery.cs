using DecoApp.Application.Categories.DTOs;
using MediatR;

namespace DecoApp.Application.Categories.Queries.GetCategoryById
{
    public record GetCategoryByIdQuery(int Id) : IRequest<CategoryDto>;

}
