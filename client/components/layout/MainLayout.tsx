import { Category } from "@/data-layer/types/Category";
import CategoryMenu from "../categories/CategoryMenu";

type Props = {
  categories: Category[];
  children: React.ReactNode;
};

export default function MainLayout({ categories, children }: Props) {
  return (
    <>
      <header className="border-b">
        <CategoryMenu categories={categories} />
      </header>

      <main>{children}</main>
    </>
  );
}
