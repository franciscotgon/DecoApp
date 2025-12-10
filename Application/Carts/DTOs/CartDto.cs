using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecoApp.Application.Carts.DTOs
{
    public class CartDto
    {
        public int CartId { get; set; }
        public string UserId { get; set; } = default!;
        public List<CartItemDto> Items { get; set; } = new();
        public decimal Total => Items.Sum(i => i.Subtotal);
    }
}
