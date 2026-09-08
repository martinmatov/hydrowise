import Link from "next/link";
import { SignOutButton } from "@/components/sign-out-button";

const NAV = [
  { href: "/admin", label: "Табло" },
  { href: "/admin/orders", label: "Поръчки" },
  { href: "/admin/products", label: "Продукти" },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <span className="text-lg font-semibold tracking-tight">
              Hydrowise Админ
            </span>
            <nav className="flex gap-5 text-sm text-neutral-600">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-neutral-900">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {email ? <span className="text-sm text-neutral-500">{email}</span> : null}
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
