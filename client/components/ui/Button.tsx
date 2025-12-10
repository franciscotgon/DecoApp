// Button.tsx
"use client";

interface ButtonProps {
  variant?: "primary" | "success" | "danger" | "warning";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean; // ✅ agregamos esto
}

export default function Button({
  variant = "primary",
  onClick,
  children,
  className = "",
  disabled = false, // opcional con default
}: ButtonProps) {
  const baseClasses =
    "px-3 py-1 rounded text-white font-semibold transition-colors duration-200";

  let colorClasses = "";

  switch (variant) {
    case "primary":
      colorClasses = "bg-blue-500 hover:bg-blue-600";
      break;
    case "success":
      colorClasses = "bg-green-500 hover:bg-green-600";
      break;
    case "danger":
      colorClasses = "bg-red-500 hover:bg-red-600";
      break;
    case "warning":
      colorClasses = "bg-yellow-500 hover:bg-yellow-600";
      break;
    default:
      colorClasses = "bg-gray-500 hover:bg-gray-600";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} // opcional: estilo cuando está deshabilitado
      disabled={disabled} // ✅ habilitamos prop
    >
      {children}
    </button>
  );
}
