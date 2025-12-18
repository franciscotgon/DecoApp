// app/services/category.service.ts
import { Category } from "@/data-layer/types/Category";
import { notFound } from "next/navigation";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`;

export async function getCategories(): Promise<Category[]> {
  try {
    console.log("Fetching categories directly from .NET:", API_URL);

    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        "Error en la API de .NET al obtener categorías:",
        res.status,
        res.statusText
      );
      return [];
    }

    const data = await res.json();
    return data as Category[];
  } catch (error) {
    console.error(
      "Error de conexión directa con .NET en getCategories:",
      error
    );
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error(`Error ${res.status}: No se pudo obtener la categoría`);
    }

    const category = await res.json();
    return category as Category;
  } catch (error) {
    console.error(`Error de conexión en getCategoryById ${id}:`, error);
    throw error;
  }
}
