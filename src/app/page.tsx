import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { formatEur } from "@/lib/currency";
import { isSvgUrl } from "@/lib/image";

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
              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group block"
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-neutral-50">
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
                      {variant.stock <= 0 ? (
                        <span className="text-xs text-red-600">Изчерпано</span>
                      ) : null}
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            ТОЛКОВА МНОГО ПОЛЗИ САМО С HYDROWISE ЩЕ ПОЛУЧИШ
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BENEFITS.map((benefit) => (
              <span
                key={benefit}
                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-brand-dark shadow-sm"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-xl font-semibold tracking-tight sm:text-2xl">
          Вдъхновени сме от:
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTS.map((expert) => (
            <div key={expert.name} className="text-center">
              <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-neutral-100">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold">{expert.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                {expert.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
