import Link from "next/link";
import { Category } from "@/data-layer/types/Category";

type Props = {
  categories: Category[];
};

export default function CategoryMenu({ categories }: Props) {
  return (
    <nav className="flex gap-6 p-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?categoryId=${category.id}`}
          className="text-gray-700 hover:text-black font-medium"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
