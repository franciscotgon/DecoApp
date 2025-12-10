using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecoApp.Application.Orders.DTOs
{
    public class OrderSummaryDto
    {
        public int Id { get; set; }

        public decimal TotalAmount { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
