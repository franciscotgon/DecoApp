import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data-layer/types/Product";

interface ProductCardProps {
  product: Product;
}

const NO_IMAGE_URL = "/images/noImageDefault.png";

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(product.price);

  const hasValidImageUrl =
    product.imageUrl && product.imageUrl.trim().length > 0;

  const imageUrl = hasValidImageUrl
    ? (product.imageUrl as string)
    : NO_IMAGE_URL;

  const isPlaceholder = !hasValidImageUrl;

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group flex flex-col overflow-hidden rounded-lg 
                  border border-gray-200 dark:border-gray-700 
                  bg-[var(--background)] shadow-sm 
                  transition-all hover:shadow-md hover:border-[var(--primary)]`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          className={`object-cover object-center 
                      transition-transform duration-300 
                      group-hover:scale-105 
                      ${isPlaceholder ? "opacity-70 grayscale" : ""}`}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-hover)] transition-colors">
          {product.name}
        </h3>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-[var(--foreground)] opacity-70">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-[var(--foreground)]">
            {formattedPrice}
          </p>

          <span
            className="text-xs font-medium text-white 
                           bg-[var(--primary)] px-3 py-1 rounded-full 
                           group-hover:bg-[var(--primary-hover)] transition-colors"
          >
            Ver detalle
          </span>
        </div>
      </div>
    </Link>
  );
}
