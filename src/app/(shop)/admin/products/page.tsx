import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin-shell";
import { formatEur } from "@/lib/currency";

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Активен",
  DRAFT: "Чернова",
  ARCHIVED: "Архивиран",
};

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);

  const products = await db.product.findMany({
    include: { variants: { where: { isDefault: true }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell email={session?.user?.email}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Продукти</h1>
        <Link
          href="/admin/products/new"
          className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          + Нов продукт
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-left text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Продукт</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Цена</th>
              <th className="px-4 py-3">Наличност</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((product) => {
              const variant = product.variants[0];
              return (
                <tr key={product.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-medium hover:text-brand-dark"
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{STATUS_LABELS[product.status]}</td>
                  <td className="px-4 py-3">
                    {variant ? formatEur(variant.priceEur.toString()) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {variant ? (
                      <span className={variant.stock === 0 ? "text-red-600" : ""}>
                        {variant.stock} бр.
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-neutral-500">
            Няма добавени продукти.
          </p>
        ) : null}
      </div>
    </AdminShell>
  );
}
