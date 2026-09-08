import { cookies } from "next/headers";
import { db } from "@/lib/db";

const CART_COOKIE = "cartId";

export async function getCartId(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value;
}

export async function getOrCreateCartId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_COOKIE)?.value;

  if (existing) {
    const cart = await db.cart.findUnique({ where: { id: existing } });
    if (cart) return cart.id;
  }

  const cart = await db.cart.create({ data: {} });
  store.set(CART_COOKIE, cart.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return cart.id;
}

export async function clearCartCookie(): Promise<void> {
  const store = await cookies();
  store.delete(CART_COOKIE);
}

export async function getCart(cartId: string | undefined) {
  if (!cartId) return null;

  return db.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: {
                include: { images: { orderBy: { position: "asc" }, take: 1 } },
              },
            },
          },
        },
      },
    },
  });
}

export function cartSubtotal(
  cart: NonNullable<Awaited<ReturnType<typeof getCart>>>
): number {
  return cart.items.reduce(
    (sum, item) => sum + Number(item.variant.priceEur) * item.quantity,
    0
  );
}
