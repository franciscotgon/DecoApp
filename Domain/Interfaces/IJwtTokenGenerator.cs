using DecoApp.Domain.Entities;

namespace DecoApp.Domain.Interfaces
{
    public interface IJwtTokenGenerator
    {
        Task<string> GenerateTokenAsync(ApplicationUser user);
    }
}
