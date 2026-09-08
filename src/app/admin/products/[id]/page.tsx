import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin-shell";
import { ProductForm } from "../product-form";
import { updateProduct } from "@/actions/admin/products";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
      variants: { where: { isDefault: true }, take: 1 },
    },
  });

  if (!product) notFound();

  const variant = product.variants[0];
  const image = product.images[0];

  async function action(formData: FormData) {
    "use server";
    await updateProduct(id, formData);
  }

  return (
    <AdminShell email={session?.user?.email}>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">{product.title}</h1>
      <ProductForm
        action={action}
        defaultValues={{
          title: product.title,
          slug: product.slug,
          descriptionHtml: product.descriptionHtml,
          status: product.status,
          imageUrl: image?.url ?? "",
          priceEur: variant?.priceEur.toString() ?? "",
          compareAtEur: variant?.compareAtEur?.toString() ?? "",
          stock: variant?.stock ?? 0,
        }}
      />
    </AdminShell>
  );
}
