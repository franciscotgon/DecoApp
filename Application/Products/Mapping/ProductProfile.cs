using AutoMapper;
using DecoApp.Application.Products.DTOs;
using DecoApp.Domain.Entities;

namespace DecoApp.Application.Products.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
        }
    }
}
