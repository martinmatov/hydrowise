"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";

const productSchema = z.object({
  title: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, "Само малки латински букви, цифри и тирета"),
  descriptionHtml: z.string().trim().optional(),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]),
  imageUrl: z.string().trim().optional(),
  priceEur: z.coerce.number().min(0),
  compareAtEur: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().int().min(0),
});

function parseForm(formData: FormData) {
  return productSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    descriptionHtml: formData.get("descriptionHtml") || undefined,
    status: formData.get("status"),
    imageUrl: formData.get("imageUrl") || undefined,
    priceEur: formData.get("priceEur"),
    compareAtEur: formData.get("compareAtEur") || undefined,
    stock: formData.get("stock"),
  });
}

export async function createProduct(formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }
  const data = parsed.data;

  const product = await db.product.create({
    data: {
      title: data.title,
      slug: data.slug,
      descriptionHtml: data.descriptionHtml || null,
      status: data.status,
      images: data.imageUrl ? { create: [{ url: data.imageUrl, position: 0 }] } : undefined,
      variants: {
        create: [
          {
            title: "По подразбиране",
            priceEur: data.priceEur,
            compareAtEur: data.compareAtEur || null,
            stock: data.stock,
            isDefault: true,
          },
        ],
      },
    },
  });

  revalidatePath("/admin/products");
  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(productId: string, formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }
  const data = parsed.data;

  const defaultVariant = await db.productVariant.findFirst({
    where: { productId, isDefault: true },
  });

  await db.product.update({
    where: { id: productId },
    data: {
      title: data.title,
      slug: data.slug,
      descriptionHtml: data.descriptionHtml || null,
      status: data.status,
      variants: defaultVariant
        ? {
            update: {
              where: { id: defaultVariant.id },
              data: {
                priceEur: data.priceEur,
                compareAtEur: data.compareAtEur || null,
                stock: data.stock,
              },
            },
          }
        : undefined,
    },
  });

  if (data.imageUrl) {
    const existingImage = await db.productImage.findFirst({ where: { productId } });
    if (existingImage) {
      await db.productImage.update({ where: { id: existingImage.id }, data: { url: data.imageUrl } });
    } else {
      await db.productImage.create({ data: { productId, url: data.imageUrl, position: 0 } });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
}
