using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecoApp.Application.Orders.Commands.DeleteOrder
{
    public class DeleteOrderCommand : IRequest<int>
    {
        public int Id { get; set; }
    }
}
