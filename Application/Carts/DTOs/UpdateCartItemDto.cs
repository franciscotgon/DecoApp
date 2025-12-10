using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecoApp.Application.Carts.DTOs
{
    public class UpdateCartItemDto
    {
        public string UserId { get; set; } = default!;
        public int ProductId { get; set; }
        public int Quantity { get; set; }   
    }
}
