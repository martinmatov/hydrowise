import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const product = await db.product.findUnique({
    where: { slug: "hydrowise" },
    include: { variants: true },
  });
  if (!product) throw new Error("Product 'hydrowise' not found");

  const single = product.variants.find((v) => v.isDefault) ?? product.variants[0];
  await db.productVariant.update({
    where: { id: single.id },
    data: { title: "1 Бутилка", stock: 50 },
  });

  const bundles = [
    { title: "2 Бутилки", priceEur: 129.99, compareAtEur: 159.98 },
    { title: "3 Бутилки", priceEur: 174.99, compareAtEur: 239.97 },
    { title: "4 Бутилки", priceEur: 199.99, compareAtEur: 319.96 },
  ];

  for (const bundle of bundles) {
    const existing = await db.productVariant.findFirst({
      where: { productId: product.id, title: bundle.title },
    });
    if (existing) {
      await db.productVariant.update({
        where: { id: existing.id },
        data: { priceEur: bundle.priceEur, compareAtEur: bundle.compareAtEur, stock: 50 },
      });
    } else {
      await db.productVariant.create({
        data: {
          productId: product.id,
          title: bundle.title,
          priceEur: bundle.priceEur,
          compareAtEur: bundle.compareAtEur,
          stock: 50,
          isDefault: false,
        },
      });
    }
  }

  console.log("Bottle variants fixed: 1/2/3/4-bottle bundle tiers now in stock.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
