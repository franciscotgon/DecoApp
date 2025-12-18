using Microsoft.AspNetCore.Identity;

namespace DecoApp.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        // Identidad básica
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? TaxId { get; set; } 

        // Datos de Envío Predeterminados
        public string? Address { get; set; }
        public string? Apartment { get; set; } 
        public string? City { get; set; }
        public string? State { get; set; }     
        public string? ZipCode { get; set; }
        public string? Country { get; set; }

        public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;

        public string? InternalNotes { get; set; }
    }
}

