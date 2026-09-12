import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { formatEur } from "@/lib/currency";
import { isSvgUrl } from "@/lib/image";
import { addToCartAction } from "@/actions/cart";
import { ExpertTabs } from "@/components/expert-tabs";

const BENEFITS = [
  "ПОВЕЧЕ енергия",
  "ПО-ХУБАВА кожа",
  "ПОВЕЧЕ концентрация",
  "ПО-ЧИСТА кожа",
  "ПО-СИЛНА имунна система",
];

const EXPERTS = [
  {
    name: "Dr. Andrew Huberman",
    image: "/brand/expert-huberman.png",
    bio: "Невролог и професор в Станфорд, който популяризира научно обосновани знания за здравето, мозъка и физиологията на човека. Говори за хидратацията, електролитния баланс и ролята на водата за енергия, концентрация и функцията на нервната система.",
  },
  {
    name: "Gary Brecka",
    image: "/brand/expert-brecka.jpg",
    bio: "Биолог и експерт по оптимизация на човешкото тяло, работещ с кръвни изследвания и биомаркери. Набляга на правилната хидратация като ключова за функцията на тялото на клетъчно ниво.",
  },
  {
    name: "Dr. Ronald Maughan",
    image: "/brand/expert-maughan.png",
    bio: "Физиолог и водещ изследовател в областта на хидратацията и спортната физиология. Известен с работата си върху водния и електролитния баланс и тяхното влияние върху физическата и когнитивната функция.",
  },
  {
    name: "Dr. Lewis James",
    image: "/brand/expert-james.png",
    bio: "Изследовател в областта на човешката физиология и хидратацията. Изучава как дори лека дехидратация влияе на енергията, концентрацията и представянето.",
  },
];

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default async function HomePage() {
  const products = await db.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
      variants: { where: { isDefault: true }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <section className="relative aspect-[16/7] w-full overflow-hidden bg-neutral-100 sm:aspect-[16/5]">
        <Image
          src="/brand/hero.png"
          alt="Hydrowise"
          fill
          priority
          className="object-cover"
        />
      </section>

      <section id="products" className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight">
          Нашите продукти
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-neutral-500">
            Няма добавени продукти все още.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {products.map((product) => {
              const variant = product.variants[0];
              const image = product.images[0];
              const savePct =
                variant?.compareAtEur && Number(variant.compareAtEur) > 0
                  ? Math.round(
                      (1 - Number(variant.priceEur) / Number(variant.compareAtEur)) * 100
                    )
                  : null;

              return (
                <div key={product.id} className="rounded-lg border border-neutral-200 p-3">
                  <Link href={`/product/${product.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-50">
                      {savePct ? (
                        <span className="absolute left-2 top-2 z-10 rounded bg-brand-gold px-2 py-1 text-xs font-bold text-white">
                          SAVE {savePct}%
                        </span>
                      ) : null}
                      {image ? (
                        <Image
                          src={image.url}
                          alt={product.title}
                          width={600}
                          height={600}
                          unoptimized={isSvgUrl(image.url)}
                          className="h-full w-full object-contain p-6 transition-transform group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <h2 className="mt-3 text-sm font-medium text-neutral-900">
                      {product.title}
                    </h2>
                    {variant ? (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-semibold text-brand-dark">
                          {formatEur(variant.priceEur.toString())}
                        </span>
                        {variant.compareAtEur ? (
                          <span className="text-xs text-neutral-400 line-through">
                            {formatEur(variant.compareAtEur.toString())}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </Link>

                  {variant && variant.stock > 0 ? (
                    <form action={addToCartAction} className="mt-3">
                      <input type="hidden" name="variantId" value={variant.id} />
                      <input type="hidden" name="quantity" value={1} />
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
                      >
                        <CartIcon />
                        Поръчай сега
                      </button>
                    </form>
                  ) : (
                    <p className="mt-3 text-center text-xs font-medium text-red-600">
                      Изчерпано
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-xl font-semibold tracking-tight text-brand-dark sm:text-2xl">
          Вдъхновени сме от:
        </h2>
        <ExpertTabs experts={EXPERTS} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            ТОЛКОВА МНОГО ПОЛЗИ САМО С HYDROWISE ЩЕ ПОЛУЧИШ
          </h2>
          <div className="rounded-lg bg-brand p-8">
            <div className="flex flex-col gap-3">
              {BENEFITS.map((benefit) => (
                <span key={benefit} className="text-lg font-bold text-white/90">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
