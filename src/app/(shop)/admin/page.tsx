import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin-shell";

const LOW_STOCK_THRESHOLD = 5;

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const [pendingOrders, lowStockVariants, totalProducts] = await Promise.all([
    db.order.count({ where: { status: "PENDING" } }),
    db.productVariant.findMany({
      where: { stock: { lte: LOW_STOCK_THRESHOLD } },
      include: { product: true },
      orderBy: { stock: "asc" },
    }),
    db.product.count({ where: { status: "ACTIVE" } }),
  ]);

  return (
    <AdminShell email={session?.user?.email}>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">Табло</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/admin/orders"
          className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-brand"
        >
          <p className="text-sm text-neutral-500">Чакащи поръчки</p>
          <p className="mt-2 text-2xl font-semibold">{pendingOrders}</p>
        </Link>
        <Link
          href="/admin/products"
          className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-brand"
        >
          <p className="text-sm text-neutral-500">Активни продукти</p>
          <p className="mt-2 text-2xl font-semibold">{totalProducts}</p>
        </Link>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">Ниска наличност</p>
          <p className="mt-2 text-2xl font-semibold">{lowStockVariants.length}</p>
        </div>
      </div>

      {lowStockVariants.length > 0 ? (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-neutral-700">
            Продукти с ниска наличност
          </h2>
          <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
            {lowStockVariants.map((variant) => (
              <li key={variant.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <Link
                  href={`/admin/products/${variant.product.id}`}
                  className="hover:text-brand-dark"
                >
                  {variant.product.title}
                </Link>
                <span className={variant.stock === 0 ? "text-red-600" : "text-amber-600"}>
                  {variant.stock} бр.
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </AdminShell>
  );
}
