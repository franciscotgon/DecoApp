"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { ProductRepository } from "@/data-layer/repositories/ProductRepository";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import AdminProductTable from "@/components/admin/products/AdminProductTable";

import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const productRepo = new ProductRepository();
  const categoryRepo = new CategoryRepository();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [p, c] = await Promise.all([
          productRepo.getAll(),
          categoryRepo.getAll(),
        ]);

        setProducts(p);
        setCategories(c);
      } catch (err) {
        console.error("Error cargando admin data:", err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Administrar Productos</h1>

        <Link
          href="/admin/products/new"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Nuevo producto
        </Link>
      </div>

      <AdminProductTable
        products={products}
        categories={categories}
        onProductsChange={setProducts}
      />
    </div>
  );
}
