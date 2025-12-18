using DecoApp.Domain.DTOs;
using MediatR;

namespace DecoApp.Application.Auth.Commands.Register
{
    public record RegisterCommand(RegisterRequest Request) : IRequest<AuthResponse>;
}
