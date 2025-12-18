using DecoApp.Domain.DTOs;
using DecoApp.Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Auth.Commands.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponse>
    {
        private readonly IIdentityService _identityService;

        public RegisterCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<AuthResponse> Handle(RegisterCommand command, CancellationToken cancellationToken)
        {
            var request = command.Request;

            var result = await _identityService.RegisterAsync(
                request.Email,
                request.Password,
                request.FirstName, 
                request.LastName   
            );

            return result;
        }
    }
}