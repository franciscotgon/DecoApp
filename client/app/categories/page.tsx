import { Category } from "@/types/category";
import Link from "next/link";

async function getCategories() {
  // Simulación de datos mockeados
  const mockCategories = [
    {
      id: 1,
      name: "Muebles",
      description: "Mesas, sillas, estanterías y más.",
      isActive: true,
    },
    {
      id: 2,
      name: "Iluminación",
      description: "Lámparas de mesa, techo y pie.",
      isActive: true,
    },
    {
      id: 3,
      name: "Decoración",
      description: "Cuadros, velas, macetas y adornos.",
      isActive: true,
    },
    {
      id: 4,
      name: "Dormitorio",
      description: "Camas, mesas de noche y ropa de cama.",
      isActive: true,
    },
    {
      id: 5,
      name: "Oficina",
      description: "Escritorios, sillas y accesorios.",
      isActive: true,
    },
    {
      id: 6,
      name: "Exterior",
      description: "Muebles y accesorios para patios y balcones.",
      isActive: true,
    },
    {
      id: 7,
      name: "Cocina",
      description: "Utensilios, almacenamiento y accesorios.",
      isActive: true,
    },
  ];

  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockCategories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Categorías</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat: Category) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="block p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <p className="text-gray-500 mt-2">
              {cat.description || "Ver productos"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
