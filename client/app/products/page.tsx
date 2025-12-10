"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";
import { Product } from "@/types/Product";
import { ProductRepository } from "@/data-layer/repositories/ProductRepository";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import { Category } from "@/types/Category";

export default function ProductsPage() {
  const userRole: "Admin" | "Customer" = "Admin";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const productRepo = new ProductRepository();
  const categoryRepo = new CategoryRepository();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          productRepo.getAll(),
          categoryRepo.getAll(),
        ]);

        // React 18 safe updates
        queueMicrotask(() => {
          setProducts(productData);
          setCategories(categoryData);
        });
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    loadData();
  }, []);

  return (
    <ProductList
      products={products}
      categories={categories} // ← 👈 NECESARIO
      userRole={userRole}
    />
  );
}
