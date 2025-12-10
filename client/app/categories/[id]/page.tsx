import { Product } from "@/types/product";
import { Category } from "@/types/category";
import Image from "next/image";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

async function getCategory(id: string): Promise<Category> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Error al cargar categoría");

  return res.json();
}

async function getProducts(id: string): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}/products`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Error al cargar productos");

  return res.json();
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { id } = params;

  const [category, products] = await Promise.all([
    getCategory(id),
    getProducts(id),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      {category.description && (
        <p className="text-gray-600 mb-8">{category.description}</p>
      )}

      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {product.imageUrl && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h2 className="text-xl font-semibold">{product.name}</h2>

              {product.description && (
                <p className="text-gray-500 mt-1 text-sm">
                  {product.description}
                </p>
              )}

              <p className="text-lg font-bold mt-4">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
