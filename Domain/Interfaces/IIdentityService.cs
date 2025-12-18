
using DecoApp.Domain.DTOs;
using DecoApp.Domain.Models;

namespace DecoApp.Domain.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthResponse> LoginAsync(string email, string password);
        Task<AuthResponse> RegisterAsync(string email, string password, string FirstName, string lastName);

        // Cambiamos object por Result
        Task<Result> ForgotPasswordAsync(string email);
        Task<Result> ResetPasswordAsync(string email, string token, string newPassword);
    }

}
