using DecoApp.Application.Carts.DTOs;
using MediatR;

namespace DecoApp.Application.Carts.Commands.SyncCart
{
    public class SyncCartCommand : IRequest<int> 
    {
        public SyncCartDto Dto { get; set; } = null!;
    }

}
