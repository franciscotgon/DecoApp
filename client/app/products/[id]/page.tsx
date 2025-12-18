import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { getProductById } from "@/app/services/product.service";
import { Product } from "@/data-layer/types/Product";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage(props: ProductDetailPageProps) {
  const params = await props.params;
  const productId = params?.id;

  if (!productId) {
    notFound();
  }

  let product: Product;
  try {
    const fetchedProduct = await getProductById(productId);

    if (!fetchedProduct) {
      notFound();
    }
    product = fetchedProduct;
  } catch (error) {
    console.error(`Error crítico al cargar el producto ${productId}:`, error);
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <ProductDetailView product={product} />
      </div>
    </main>
  );
}
