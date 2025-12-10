using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DecoApp.Application.Carts.DTOs;
using MediatR;

namespace DecoApp.Application.Carts.Queries.GetCartByUser
{
    public record GetCartByUserQuery : IRequest<CartDto?>
    {
        public string UserId { get; set; } = default!;
    }

}
