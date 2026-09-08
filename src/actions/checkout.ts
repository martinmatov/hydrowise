"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCartId, getCart, cartSubtotal, clearCartCookie } from "@/lib/cart";
import { calculateShipping } from "@/lib/shipping";
import { sendOrderEmails } from "@/lib/email";

const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Моля, въведете име и фамилия"),
  email: z
    .string()
    .trim()
    .email("Моля, въведете валиден имейл")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s()-]{6,20}$/, "Моля, въведете валиден телефонен номер"),
  address: z.string().trim().min(3, "Моля, въведете адрес"),
  city: z.string().trim().min(2, "Моля, въведете град"),
  postalCode: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export type CheckoutState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function placeOrder(
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const parsed = checkoutSchema.safeParse({
    customerName: formData.get("customerName"),
    email: formData.get("email") || undefined,
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode") || undefined,
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { error: "Моля, проверете въведените данни.", fieldErrors };
  }

  const cartId = await getCartId();
  const cart = await getCart(cartId);

  if (!cart || cart.items.length === 0) {
    return { error: "Количката е празна." };
  }

  const subtotal = cartSubtotal(cart);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  const order = await db.order.create({
    data: {
      ...parsed.data,
      email: parsed.data.email || null,
      subtotalEur: subtotal,
      shippingEur: shipping,
      totalEur: total,
      items: {
        create: cart.items.map((item) => ({
          variantId: item.variantId,
          titleSnapshot: `${item.variant.product.title}${
            item.variant.title !== "По подразбиране" ? ` — ${item.variant.title}` : ""
          }`,
          priceEurSnapshot: item.variant.priceEur,
          quantity: item.quantity,
          source: item.isOrderBump ? "ORDER_BUMP" : "STANDARD",
        })),
      },
    },
    include: { items: true },
  });

  await db.cartItem.deleteMany({ where: { cartId: cart.id } });
  await clearCartCookie();

  try {
    await sendOrderEmails({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      postalCode: order.postalCode,
      notes: order.notes,
      items: order.items,
      subtotalEur: order.subtotalEur.toString(),
      shippingEur: order.shippingEur.toString(),
      totalEur: order.totalEur.toString(),
    });
  } catch (err) {
    console.error("Order email dispatch failed:", err);
  }

  redirect(`/order/${order.id}/thank-you`);
}
