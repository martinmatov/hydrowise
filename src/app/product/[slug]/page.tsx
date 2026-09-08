import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatEur } from "@/lib/currency";
import { addToCartAction } from "@/actions/cart";
import { isSvgUrl } from "@/lib/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      variants: { where: { isDefault: true }, take: 1 },
    },
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  const variant = product.variants[0];
  const image = product.images[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 sm:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-neutral-50">
          {image ? (
            <Image
              src={image.url}
              alt={product.title}
              width={800}
              height={800}
              unoptimized={isSvgUrl(image.url)}
              className="h-full w-full object-contain p-8"
              priority
            />
          ) : null}
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {product.title}
          </h1>

          {variant ? (
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-xl font-medium text-brand-dark">
                {formatEur(variant.priceEur.toString())}
              </span>
              {variant.compareAtEur ? (
                <>
                  <span className="text-neutral-400 line-through">
                    {formatEur(variant.compareAtEur.toString())}
                  </span>
                  <span className="rounded bg-brand-gold px-2 py-0.5 text-xs font-semibold text-white">
                    СПЕСТИ
                  </span>
                </>
              ) : null}
            </div>
          ) : null}

          {product.descriptionHtml ? (
            <div
              className="prose prose-neutral mt-6 max-w-none text-neutral-700"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : null}

          {variant && variant.stock <= 0 ? (
            <p className="mt-6 text-sm text-red-600">Изчерпано количество</p>
          ) : variant ? (
            <form action={addToCartAction} className="mt-6">
              <input type="hidden" name="variantId" value={variant.id} />
              <input type="hidden" name="quantity" value={1} />
              <button
                type="submit"
                className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:w-auto sm:px-10"
              >
                Добави в количката
              </button>
            </form>
          ) : null}

          <p className="mt-4 text-sm text-neutral-500">
            Плащане в брой при доставка
          </p>
        </div>
      </div>
    </div>
  );
}
