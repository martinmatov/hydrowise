import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Hydrowise",
  description: "Hydrowise — онлайн магазин с плащане при доставка",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bg" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-neutral-900">{children}</body>
    </html>
  );
}
