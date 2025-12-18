using DecoApp.Domain.DTOs;
using DecoApp.Domain.Interfaces;
using MediatR;

namespace DecoApp.Application.Auth.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponse>
    {
        private readonly IIdentityService _identityService;

        public LoginCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<AuthResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var result = await _identityService.LoginAsync(request.Email, request.Password);

            if (!result.Success)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Credenciales inválidas."
                };
            }

            return result;
        }
    }
}
