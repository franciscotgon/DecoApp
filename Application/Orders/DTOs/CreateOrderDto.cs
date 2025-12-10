using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecoApp.Application.Orders.DTOs
{
    public class CreateOrderDto
    {
        public string UserId { get; set; } = null!;

        public string? Notes { get; set; }
    }
}
