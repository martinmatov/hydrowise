import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin-shell";
import { formatEur } from "@/lib/currency";
import { updateOrderStatus } from "@/actions/admin/orders";
import type { OrderStatus } from "@prisma/client";

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Чакаща",
  CONFIRMED: "Потвърдена",
  SHIPPED: "Изпратена",
  DELIVERED: "Доставена",
  CANCELLED: "Отказана",
};

const SOURCE_LABELS: Record<string, string> = {
  STANDARD: "",
  ORDER_BUMP: "допълнителна оферта",
  POST_PURCHASE_UPSELL: "добавено след поръчката",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  async function handleStatusChange(formData: FormData) {
    "use server";
    const status = formData.get("status");
    if (typeof status === "string") {
      await updateOrderStatus(order!.id, status);
    }
  }

  return (
    <AdminShell email={session?.user?.email}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          Поръчка №{order.orderNumber}
        </h1>
        <form action={handleStatusChange} className="flex items-center gap-2">
          <select
            name="status"
            defaultValue={order.status}
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm"
          >
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
            Запази
          </button>
        </form>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-neutral-700">
            Данни за клиента
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Име</dt>
              <dd>{order.customerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Телефон</dt>
              <dd>{order.phone}</dd>
            </div>
            {order.email ? (
              <div className="flex justify-between">
                <dt className="text-neutral-500">Имейл</dt>
                <dd>{order.email}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-neutral-500">Адрес</dt>
              <dd className="text-right">
                {order.address}, {order.city}
                {order.postalCode ? ` ${order.postalCode}` : ""}
              </dd>
            </div>
            {order.notes ? (
              <div className="flex justify-between">
                <dt className="text-neutral-500">Бележка</dt>
                <dd className="text-right">{order.notes}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-neutral-700">
            Артикули
          </h2>
          <ul className="space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span className="text-neutral-700">
                  {item.titleSnapshot} × {item.quantity}
                  {SOURCE_LABELS[item.source] ? (
                    <span className="ml-1 text-xs text-neutral-400">
                      ({SOURCE_LABELS[item.source]})
                    </span>
                  ) : null}
                </span>
                <span>{formatEur((Number(item.priceEurSnapshot) * item.quantity).toString())}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-neutral-200 pt-3 text-sm">
            <div className="flex justify-between text-neutral-500">
              <span>Междинна сума</span>
              <span>{formatEur(order.subtotalEur.toString())}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Доставка</span>
              <span>
                {Number(order.shippingEur) === 0 ? "Безплатна" : formatEur(order.shippingEur.toString())}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Общо</span>
              <span>{formatEur(order.totalEur.toString())}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
