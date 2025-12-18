using DecoApp.Domain.Interfaces;
using DecoApp.Domain.Models;
using MediatR;

namespace DecoApp.Application.Auth.Commands.ForgotPassword
{
    public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, Result>
    {
        private readonly IIdentityService _identityService;

        public ForgotPasswordCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<Result> Handle(ForgotPasswordCommand request, CancellationToken ct)
        {
            return await _identityService.ForgotPasswordAsync(request.Email);
        }
    }
}
