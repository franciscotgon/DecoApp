// app/services/product.service.ts
import { Product } from "@/data-layer/types/Product";
import { notFound } from "next/navigation";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

// === OBTENER TODOS LOS PRODUCTOS ===
export async function getProducts(): Promise<Product[]> {
  try {
    console.log("Fetching products directly from .NET:", API_URL);

    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        "Error en la API de .NET al obtener productos:",
        res.status,
        res.statusText
      );
      return [];
    }

    const data = await res.json();
    return data as Product[];
  } catch (error) {
    console.error("Error de conexión directa con .NET en getProducts:", error);
    return [];
  }
}

// === OBTENER PRODUCTO POR ID ===
export async function getProductById(id: string): Promise<Product> {
  try {
    console.log(
      "Fetching product by ID directly from .NET:",
      `${API_URL}/${id}`
    );

    const res = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      console.error(
        `Error al obtener producto ${id}:`,
        res.status,
        res.statusText
      );
      throw new Error("Fallo al obtener los datos del producto.");
    }

    const product = await res.json();
    return product as Product;
  } catch (error) {
    console.error(`Error de conexión en getProductById ${id}:`, error);
    throw error;
  }
}
