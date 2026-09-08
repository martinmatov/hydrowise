import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";
import { ProductForm } from "../product-form";
import { createProduct } from "@/actions/admin/products";

export default async function NewProductPage() {
  const session = await getServerSession(authOptions);

  return (
    <AdminShell email={session?.user?.email}>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">Нов продукт</h1>
      <ProductForm action={createProduct} />
    </AdminShell>
  );
}
