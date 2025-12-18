using AutoMapper;
using DecoApp.Application.Orders.DTOs;
using DecoApp.Domain.Entities;

namespace DecoApp.Application.Orders.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            // 1. De DTO de entrada a Entidad (Creación)
            CreateMap<CreateOrderDto, Order>()
                .ForMember(dest => dest.Items, opt => opt.Ignore()) 
                .ForMember(dest => dest.TotalAmount, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());

            // 2. De Entidad a DTO de salida (Lectura de Orden completa)
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

            // 3. De Entidad a DTO de resumen (Listados)
            CreateMap<Order, OrderSummaryDto>();

            // 4. Mapeo de los ítems de la orden
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name));
        }
    }
}