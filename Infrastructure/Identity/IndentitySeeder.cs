using DecoApp.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace DecoApp.Infrastructure.Identity
{
    public static class IdentitySeeder
    {
        public static async Task SeedAsync(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            // --- Roles to seed ---
            var roles = new[]
            {
                "Admin",
                "Customer"
            };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    var identityRole = new IdentityRole(role)
                    {
                        NormalizedName = role.ToUpper()
                    };

                    var roleResult = await roleManager.CreateAsync(identityRole);

                    if (!roleResult.Succeeded)
                    {
                        var errors = string.Join(", ", roleResult.Errors.Select(e => e.Description));
                        throw new Exception($"Failed to create role '{role}': {errors}");
                    }
                }
            }

            // --- Default Admin user ---
            const string adminEmail = "admin@shop.com";
            const string adminPassword = "Admin123!@#"; 

            var existingAdmin = await userManager.FindByEmailAsync(adminEmail);

            if (existingAdmin == null)
            {
                var adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var createUser = await userManager.CreateAsync(adminUser, adminPassword);

                if (!createUser.Succeeded)
                {
                    var errors = string.Join(", ", createUser.Errors.Select(e => e.Description));
                    throw new Exception($"Admin creation failed: {errors}");
                }

                var assignRole = await userManager.AddToRoleAsync(adminUser, "Admin");

                if (!assignRole.Succeeded)
                {
                    var errors = string.Join(", ", assignRole.Errors.Select(e => e.Description));
                    throw new Exception($"Failed to assign Admin role: {errors}");
                }
            }
        }
    }
}
