using DecoApp.Domain.DTOs;
using MediatR;

namespace DecoApp.Application.Auth.Commands.Login
{
    public record LoginCommand(string Email, string Password) : IRequest<AuthResponse>;
}
