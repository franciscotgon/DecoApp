using DecoApp.Application.Common;
using DecoApp.Infrastructure.Identity;
using DecoApp.Infrastructure.Persistence;
using DecoApp.Infrastructure.Repositories;
using DecoApp.Infrastructure.Seeders;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ---------------------------------------------
// Database
// ---------------------------------------------
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsql => npgsql.MigrationsAssembly("DecoApp.Infrastructure")
    )
);

// ---------------------------------------------
// Identity
// ---------------------------------------------
builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequiredLength = 6;

        options.Lockout.AllowedForNewUsers = true;
        options.Lockout.MaxFailedAccessAttempts = 5;

        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// ---------------------------------------------
// FluentValidation
// ---------------------------------------------
builder.Services.AddValidatorsFromAssembly(typeof(AssemblyReference).Assembly);

// ---------------------------------------------
// AutoMapper
// ---------------------------------------------
builder.Services.AddAutoMapper(typeof(AssemblyReference).Assembly);

// ---------------------------------------------
// MediatR
// ---------------------------------------------
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(AssemblyReference).Assembly);
});

// ---------------------------------------------
// Repositories
// ---------------------------------------------
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
// Si tenés repositorios especializados, agrégalos aquí.

// ---------------------------------------------
// Controllers + Swagger
// ---------------------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()   // Permite cualquier dominio
            .AllowAnyMethod()   // Permite GET, POST, PUT, DELETE...
            .AllowAnyHeader()   // Permite todos los headers
    );
});

var app = builder.Build();

// ---------------------------------------------
// Middleware pipeline
// ---------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// ---------------------------------------------
// Database migration + seeding
// ---------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    // Migrate database
    var db = services.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();

    // Seed roles + admin
    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    await IdentitySeeder.SeedAsync(userManager, roleManager);

    // Seed products
    await ProductSeeder.SeedAsync(db);
}
app.Run();
