using AutoMapper;
using DecoApp.Application.Products.DTOs;
using DecoApp.Domain.Entities;

namespace DecoApp.Application.Products.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
        }
    }
}
