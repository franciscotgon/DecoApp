using System;
using DecoApp.Application.Carts.DTOs;
using MediatR;

namespace DecoApp.Application.Carts.Commands.AddItemToCart
{
    public record AddItemToCartCommand : IRequest<int>
    {
        public AddItemToCartDto Dto { get; set; } = default!;
    }

}
