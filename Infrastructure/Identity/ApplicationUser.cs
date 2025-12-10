using Microsoft.AspNetCore.Identity;

namespace DecoApp.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }

        public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;

        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }

        public bool IsActive { get; set; } = true;
    }
}

