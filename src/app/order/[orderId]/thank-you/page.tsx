import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatEur } from "@/lib/currency";

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white">
        ✓
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Благодарим за поръчката!
      </h1>
      <p className="mt-2 text-neutral-600">
        Поръчка №{order.orderNumber} е приета. Ще се свържем с вас по телефона
        за потвърждение преди доставка.
      </p>

      <div className="mt-8 rounded-lg bg-neutral-50 p-6 text-left">
        <ul className="space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span className="text-neutral-600">
                {item.titleSnapshot} × {item.quantity}
              </span>
              <span>
                {formatEur(
                  (Number(item.priceEurSnapshot) * item.quantity).toString()
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-neutral-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Доставка</span>
            <span>
              {Number(order.shippingEur) === 0
                ? "Безплатна"
                : formatEur(order.shippingEur.toString())}
            </span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Общо (в брой при доставка)</span>
            <span>{formatEur(order.totalEur.toString())}</span>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-sm text-brand-dark hover:underline"
      >
        Обратно към магазина
      </Link>
    </div>
  );
}
