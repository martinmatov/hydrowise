import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hydrowise",
  description: "Hydrowise — онлайн магазин с плащане при доставка",
};

const FOOTER_LINKS = [
  { href: "/policies/obshti-uslovia", label: "Общи условия" },
  { href: "/policies/poveritelnost", label: "Политика за поверителност" },
  { href: "/policies/vrashtane", label: "Политика за връщане" },
  { href: "/policies/kontakti", label: "Информация за контакт" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bg"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
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

        <footer className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-sm font-medium text-neutral-700">
                Абонирай се за специални оферти и нови продукти
              </p>
              <div className="flex w-full max-w-sm gap-2">
                <input
                  type="email"
                  placeholder="Твоят имейл"
                  className="flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm"
                  disabled
                />
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white opacity-60"
                >
                  Абонирай се
                </button>
              </div>
            </div>

            <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500">
              {FOOTER_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-neutral-800">
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="mt-8 text-center text-sm text-neutral-500">
              Плащане в брой при доставка · © {new Date().getFullYear()} Hydrowise
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
