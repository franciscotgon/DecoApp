using FluentValidation;

namespace DecoApp.Application.Products.Commands.CreateProduct
{
    public class CreateProductValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductValidator()
        {
            RuleFor(x => x.Dto.Name)
                .NotEmpty().WithMessage("El nombre del producto es obligatorio.")
                .MaximumLength(150).WithMessage("El nombre no puede superar los 150 caracteres.");

            RuleFor(x => x.Dto.Price)
                .GreaterThan(0).WithMessage("El precio debe ser mayor a 0.");

            RuleFor(x => x.Dto.Stock)
                .GreaterThanOrEqualTo(0).WithMessage("El stock no puede ser negativo.");

            RuleFor(x => x.Dto.CategoryId)
                .GreaterThan(0).WithMessage("El CategoryId es obligatorio.");

            RuleFor(x => x.Dto.Description)
                .MaximumLength(500)
                .WithMessage("La descripción no puede superar los 500 caracteres.");
        }
    }
}
