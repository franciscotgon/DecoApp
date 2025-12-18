import Link from "next/link";

export default function AdminCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-foreground/5 border border-foreground/10 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-foreground/[0.08] hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-foreground/50 text-sm mt-2 leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
