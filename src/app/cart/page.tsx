import Image from "next/image";
import Link from "next/link";
import { getCartId, getCart, cartSubtotal } from "@/lib/cart";
import { calculateShipping, FREE_SHIPPING_THRESHOLD_EUR } from "@/lib/shipping";
import { formatEur } from "@/lib/currency";
import { updateCartItemQuantity, removeCartItem } from "@/actions/cart";
import { isSvgUrl } from "@/lib/image";

export default async function CartPage() {
  const cartId = await getCartId();
  const cart = await getCart(cartId);

  const isEmpty = !cart || cart.items.length === 0;

  const subtotal = cart ? cartSubtotal(cart) : 0;
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Количка</h1>

      {isEmpty ? (
        <div>
          <p className="text-neutral-500">Количката е празна.</p>
          <Link href="/" className="mt-4 inline-block text-brand-dark hover:underline">
            Разгледай продуктите
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {cart.items.map((item) => {
              const image = item.variant.product.images[0];
              return (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-50">
                    {image ? (
                      <Image
                        src={image.url}
                        alt={item.variant.product.title}
                        width={80}
                        height={80}
                        unoptimized={isSvgUrl(image.url)}
                        className="h-full w-full object-contain p-1"
                      />
                    ) : null}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.variant.product.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatEur(item.variant.priceEur.toString())}
                    </p>

                    <form
                      action={async (formData: FormData) => {
                        "use server";
                        const quantity = Number(formData.get("quantity"));
                        await updateCartItemQuantity(item.id, quantity);
                      }}
                      className="mt-2 flex items-center gap-2"
                    >
                      <input
                        type="number"
                        name="quantity"
                        min={1}
                        defaultValue={item.quantity}
                        className="w-16 rounded border border-neutral-300 px-2 py-1 text-sm"
                      />
                      <button
                        type="submit"
                        className="text-xs text-neutral-600 underline hover:text-neutral-900"
                      >
                        Обнови
                      </button>
                    </form>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-medium">
                      {formatEur(
                        (Number(item.variant.priceEur) * item.quantity).toString()
                      )}
                    </p>
                    <form
                      action={async () => {
                        "use server";
                        await removeCartItem(item.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-xs text-neutral-500 underline hover:text-red-600"
                      >
                        Премахни
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Междинна сума</span>
              <span>{formatEur(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Доставка</span>
              <span>{shipping === 0 ? "Безплатна" : formatEur(shipping)}</span>
            </div>
            {shipping > 0 ? (
              <p className="text-xs text-neutral-500">
                Безплатна доставка над {formatEur(FREE_SHIPPING_THRESHOLD_EUR)}
              </p>
            ) : null}
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-semibold">
              <span>Общо</span>
              <span>{formatEur(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Продължи към поръчка
          </Link>
        </>
      )}
    </div>
  );
}
