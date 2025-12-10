using AutoMapper;
using DecoApp.Application.Categories.DTOs;
using DecoApp.Domain.Entities;

namespace DecoApp.Application.Categories.Mapping
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();
        }
    } 
}
