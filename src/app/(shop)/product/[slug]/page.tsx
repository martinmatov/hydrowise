import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatEur } from "@/lib/currency";
import { isSvgUrl } from "@/lib/image";
import { addToCartAction } from "@/actions/cart";
import { BundleSelector } from "@/components/bundle-selector";
import { FaqAccordion } from "@/components/faq-accordion";
import { StarRating } from "@/components/star-rating";
import { DeliveryTimeline } from "@/components/delivery-timeline";
import {
  TrustBadgeStrip,
  HowItWorksSection,
  MarqueeStrip,
  WhyItWorksSection,
  StatsBanner,
  ComparisonTable,
  ReviewsSection,
} from "@/components/product/bottle-sections";

const PLACEHOLDER_ANSWER =
  "Очаква съдържание — изпрати ми реалния отговор от твоя сайт и ще го добавя тук.";

const BOTTLE_FAQ = [
  "Безопасна ли е водородната вода?",
  "Колко водородна вода трябва да пия на ден?",
  "Може ли да се използва всякакъв вид вода?",
  "Трябва ли филтрите да се подменят?",
  "Как Hydrowise създава водород във водата?",
  "Как се почиства бутилката?",
  "От какъв материал е изработена бутилката?",
  "Мога ли да използвам бутилката отново веднага след приключване на един водороден цикъл?",
  "Какъв е окислително-редукционният потенциал (ORP) на Hydrowise?",
].map((q) => ({ q, a: PLACEHOLDER_ANSWER }));

type HowToUseStep = { title: string };

const HOW_TO_USE: Record<string, HowToUseStep[]> = {
  shiladzhit: [
    { title: "Отвори бутилката" },
    { title: "Приеми с чаша вода" },
    { title: "Живей с пълна енергия" },
  ],
  "elektroliti-hydrowise": [
    { title: "Разтвори 1 доза във вода" },
    { title: "Разбъркай и изпий на малки глътки" },
    { title: "Усети баланса през деня" },
  ],
  hydrowise: [
    { title: "Напълни с вода" },
    { title: "Натисни бутона" },
    { title: "Изчакай синята светлина" },
  ],
};

const GENERIC_FAQ = [
  {
    q: "Как да съхранявам продукта?",
    a: "На сухо и хладно място, далеч от директна слънчева светлина, съгласно указанията на опаковката.",
  },
  {
    q: "Мога ли да го комбинирам с други хранителни добавки?",
    a: "В повечето случаи да, но при съществуващо лечение или бременност/кърмене се консултирай с лекар преди употреба.",
  },
  {
    q: "За колко време ще получа поръчката?",
    a: "Обичайно за 1–3 работни дни в България. Плащането е в брой при доставка — куриерът ще се свърже с теб предварително.",
  },
  {
    q: "Мога ли да върна продукта?",
    a: "Да, съгласно нашата политика за връщане — виж повече в долната част на сайта.",
  },
];

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
      variants: { orderBy: { priceEur: "asc" } },
    },
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  const variants = product.variants;
  const defaultVariant = variants.find((v) => v.isDefault) ?? variants[0];
  const image = product.images[0];
  const steps = HOW_TO_USE[slug];
  const hasBundles = variants.length > 1;
  const isBottle = slug === "hydrowise";

  const savePct =
    defaultVariant?.compareAtEur && Number(defaultVariant.compareAtEur) > 0
      ? Math.round(
          (1 - Number(defaultVariant.priceEur) / Number(defaultVariant.compareAtEur)) * 100
        )
      : null;

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 py-12" id="buy">
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
            <h1 className="text-2xl font-semibold tracking-tight">{product.title}</h1>

            {isBottle ? (
              <div className="mt-2 flex items-center gap-2">
                <StarRating value={4.79} />
                <span className="text-sm text-body">4.79 | 130+ Ревюта</span>
              </div>
            ) : null}

            {defaultVariant ? (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg font-bold text-brand-dark">
                  {formatEur(defaultVariant.priceEur.toString())}
                </span>
                {defaultVariant.compareAtEur ? (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatEur(defaultVariant.compareAtEur.toString())}
                  </span>
                ) : null}
                {savePct ? (
                  <span className="rounded-full bg-brand-gold px-2 py-0.5 text-xs font-bold text-white">
                    SAVE {savePct}%
                  </span>
                ) : null}
              </div>
            ) : null}

            {product.descriptionHtml ? (
              <div
                className="prose prose-neutral mt-4 max-w-none text-sm text-neutral-700"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : null}

            <div className="mt-6">
              {defaultVariant && defaultVariant.stock <= 0 && !hasBundles ? (
                <p className="text-sm font-medium text-red-600">Изчерпано количество</p>
              ) : hasBundles ? (
                <BundleSelector
                  variants={variants.map((v) => ({
                    id: v.id,
                    title: v.title,
                    priceEur: v.priceEur.toString(),
                    compareAtEur: v.compareAtEur?.toString() ?? null,
                    stock: v.stock,
                  }))}
                />
              ) : defaultVariant ? (
                <form action={addToCartAction}>
                  <input type="hidden" name="variantId" value={defaultVariant.id} />
                  <input type="hidden" name="quantity" value={1} />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
                  >
                    Поръчай сега
                  </button>
                </form>
              ) : null}
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-4">
              <DeliveryTimeline />
            </div>

            <p className="mt-4 text-sm text-neutral-500">Плащане в брой при доставка</p>
          </div>
        </div>
      </div>

      {isBottle ? (
        <>
          <TrustBadgeStrip />
          <HowItWorksSection imageUrl={image?.url ?? "/brand/product-bottle.svg"} />
          <MarqueeStrip />
          <WhyItWorksSection imageUrl={image?.url ?? "/brand/product-bottle.svg"} />
          <StatsBanner />
          <ComparisonTable />
          <section className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="mb-8 text-center text-xl font-semibold tracking-tight sm:text-2xl">
              Имате въпроси? Ние отговаряме
            </h2>
            <FaqAccordion items={BOTTLE_FAQ} />
          </section>
          <ReviewsSection />
        </>
      ) : steps ? (
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-10 text-center text-xl font-semibold tracking-tight sm:text-2xl">
              Как се използва?
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <p className="mt-3 text-sm font-medium">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {!isBottle ? (
        <>
          <section className="mx-auto max-w-4xl px-6 py-16">
            <div className="rounded-lg border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-400">
              Тук ще добавим историята на продукта / бранда — изпрати ми текста и ще го включа тук.
            </div>
          </section>

          <section className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="mb-8 text-center text-xl font-semibold tracking-tight sm:text-2xl">
              Имате въпроси? Ние отговаряме
            </h2>
            <FaqAccordion items={GENERIC_FAQ} />
          </section>

          <section className="mx-auto max-w-4xl px-6 py-16">
            <h2 className="mb-6 text-center text-xl font-semibold tracking-tight sm:text-2xl">
              Отзиви от клиенти
            </h2>
            <div className="rounded-lg border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-400">
              Тук ще добавим реални отзиви от клиенти.
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
