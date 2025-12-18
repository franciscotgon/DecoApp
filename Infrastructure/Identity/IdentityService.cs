using DecoApp.Domain.DTOs;
using DecoApp.Domain.Entities;
using DecoApp.Domain.Interfaces;
using DecoApp.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace DecoApp.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _tokenGenerator;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            IJwtTokenGenerator tokenGenerator)
        {
            _userManager = userManager;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<AuthResponse> RegisterAsync(string email, string password, string firstName, string lastName)
        {
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                FirstName = firstName, 
                LastName = lastName,  
                RegisteredAt = DateTime.UtcNow,
                IsActive = true
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = string.Join(", ", result.Errors.Select(e => e.Description))
                };
            }

            await _userManager.AddToRoleAsync(user, "Customer");

            var token = await _tokenGenerator.GenerateTokenAsync(user);

            return new AuthResponse
            {
                Success = true,
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email!,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = "Customer"
                }
            };
        }

        public async Task<AuthResponse> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return new AuthResponse { Success = false, Message = "Email o contraseña incorrectos" };
            }

            var roles = await _userManager.GetRolesAsync(user);
            var token = await _tokenGenerator.GenerateTokenAsync(user);

            return new AuthResponse
            {
                Success = true,
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email!,
                    FirstName = user.FirstName ?? "",
                    LastName = user.LastName ?? "",
                    Role = roles.FirstOrDefault() ?? "Customer"
                }
            };
        }

        public async Task<Result> ForgotPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Result.Success("Si el correo existe, se envió un enlace.");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            // Aquí iría el envío de mail
            return Result.Success("Token de recuperación generado.");
        }

        public async Task<Result> ResetPasswordAsync(string email, string token, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Result.Failure(new[] { "Error al procesar la solicitud." });

            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
            return result.Succeeded
                ? Result.Success("Contraseña restablecida.")
                : Result.Failure(result.Errors.Select(e => e.Description));
        }
    }
}