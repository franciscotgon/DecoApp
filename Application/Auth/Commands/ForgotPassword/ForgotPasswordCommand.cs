using DecoApp.Domain.Models;
using MediatR;

namespace DecoApp.Application.Auth.Commands.ForgotPassword
{
    public record ForgotPasswordCommand(string Email) : IRequest<Result>;
}
