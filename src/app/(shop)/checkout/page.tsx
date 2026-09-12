import { redirect } from "next/navigation";
import { getCartId, getCart, cartSubtotal } from "@/lib/cart";
import { calculateShipping } from "@/lib/shipping";
import { formatEur } from "@/lib/currency";
import { CheckoutForm } from "./checkout-form";

export default async function CheckoutPage() {
  const cartId = await getCartId();
  const cart = await getCart(cartId);

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const subtotal = cartSubtotal(cart);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">
        Данни за доставка
      </h1>

      <div className="grid gap-10 sm:grid-cols-2">
        <CheckoutForm />

        <div className="rounded-lg bg-neutral-50 p-6">
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">
            Резюме на поръчката
          </h2>
          <ul className="space-y-2 text-sm">
            {cart.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span className="text-neutral-600">
                  {item.variant.product.title} × {item.quantity}
                </span>
                <span>
                  {formatEur(
                    (Number(item.variant.priceEur) * item.quantity).toString()
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-neutral-200 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Междинна сума</span>
              <span>{formatEur(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Доставка</span>
              <span>{shipping === 0 ? "Безплатна" : formatEur(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Общо (в брой при доставка)</span>
              <span>{formatEur(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
