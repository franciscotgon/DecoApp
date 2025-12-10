using DecoApp.Application.Orders.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecoApp.Application.Orders.Queries.GetOrderByUser
{
    public class GetOrderByUserQuery : IRequest<IEnumerable<OrderSummaryDto>>
    {
        public string UserId {get; set;} = default!;
    }
}
