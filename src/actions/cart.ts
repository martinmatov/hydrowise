"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getOrCreateCartId } from "@/lib/cart";

export async function addToCart(variantId: string, quantity: number = 1) {
  const cartId = await getOrCreateCartId();

  await db.cartItem.upsert({
    where: { cartId_variantId: { cartId, variantId } },
    update: { quantity: { increment: quantity } },
    create: { cartId, variantId, quantity },
  });

  revalidatePath("/cart");
}

export async function addToCartAction(formData: FormData) {
  const variantId = formData.get("variantId");
  if (typeof variantId !== "string" || !variantId) return;
  const quantity = Number(formData.get("quantity") ?? 1) || 1;
  await addToCart(variantId, quantity);
  redirect("/cart");
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  if (quantity <= 0) {
    await db.cartItem.delete({ where: { id: itemId } });
  } else {
    await db.cartItem.update({ where: { id: itemId }, data: { quantity } });
  }
  revalidatePath("/cart");
}

export async function removeCartItem(itemId: string) {
  await db.cartItem.delete({ where: { id: itemId } });
  revalidatePath("/cart");
}
