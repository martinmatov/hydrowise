import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/policies/obshti-uslovia", label: "Общи условия" },
  { href: "/policies/poveritelnost", label: "Политика за поверителност" },
  { href: "/policies/vrashtane", label: "Политика за връщане" },
  { href: "/policies/kontakti", label: "Информация за контакт" },
];

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Hydrowise"
              width={140}
              height={60}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-6 text-sm text-neutral-600">
            <Link href="/#products" className="hover:text-neutral-900">
              Продукти
            </Link>
            <Link href="/cart" className="hover:text-neutral-900">
              Количка
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-brand">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium text-white">
              Абонирай се за специални оферти и нови продукти
            </p>
            <div className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                placeholder="Твоят имейл"
                className="flex-1 rounded-lg border border-white/30 bg-white px-4 py-2 text-sm"
                disabled
              />
              <button
                type="button"
                disabled
                className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-brand-dark opacity-90"
              >
                Абонирай се
              </button>
            </div>
          </div>

          <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/80">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="mt-8 text-center text-sm text-white/70">
            Плащане в брой при доставка · © {new Date().getFullYear()} Hydrowise
          </p>
        </div>
      </footer>
    </div>
  );
}
