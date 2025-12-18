using DecoApp.Application.Auth.Commands.ForgotPassword;
using DecoApp.Application.Auth.Commands.Login;
using DecoApp.Application.Auth.Commands.Register;
using DecoApp.Domain.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DecoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator) => _mediator = mediator;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _mediator.Send(new LoginCommand(request.Email, request.Password));
            return response.Success ? Ok(response) : BadRequest(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var response = await _mediator.Send(new RegisterCommand(request));
            return response.Success ? Ok(response) : BadRequest(response);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var result = await _mediator.Send(new ForgotPasswordCommand(email));
            return Ok(new { message = "Si el correo existe, se ha enviado un enlace de recuperación." });
        }
    }
}
