import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin-shell";
import { formatEur } from "@/lib/currency";
import type { OrderStatus, Prisma } from "@prisma/client";

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Чакаща",
  CONFIRMED: "Потвърдена",
  SHIPPED: "Изпратена",
  DELIVERED: "Доставена",
  CANCELLED: "Отказана",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-neutral-200 text-neutral-600",
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { status, q } = await searchParams;

  const where: Prisma.OrderWhereInput = {};
  if (status && status in STATUS_LABELS) where.status = status as OrderStatus;
  if (q) {
    where.OR = [
      { customerName: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
    ];
  }

  const orders = await db.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <AdminShell email={session?.user?.email}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Поръчки</h1>
      </div>

      <form className="mb-4 flex flex-wrap gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Търси по име или телефон"
          className="rounded border border-neutral-300 px-3 py-1.5 text-sm"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded border border-neutral-300 px-3 py-1.5 text-sm"
        >
          <option value="">Всички статуси</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded bg-neutral-900 px-4 py-1.5 text-sm text-white"
        >
          Филтрирай
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-left text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">№</th>
              <th className="px-4 py-3">Клиент</th>
              <th className="px-4 py-3">Телефон</th>
              <th className="px-4 py-3">Град</th>
              <th className="px-4 py-3">Сума</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Дата</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="font-medium hover:text-brand-dark">
                    №{order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">{order.customerName}</td>
                <td className="px-4 py-3">{order.phone}</td>
                <td className="px-4 py-3">{order.city}</td>
                <td className="px-4 py-3">{formatEur(order.totalEur.toString())}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_COLORS[order.status]}`}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {order.createdAt.toLocaleDateString("bg-BG")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-neutral-500">
            Няма намерени поръчки.
          </p>
        ) : null}
      </div>
    </AdminShell>
  );
}
