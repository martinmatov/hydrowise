import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.product.upsert({
    where: { slug: "hydrowise" },
    update: {},
    create: {
      slug: "hydrowise",
      title: "Hydrowise (Водородна бутилка)",
      descriptionHtml: `
        <ul>
          <li>💦 Повече енергия</li>
          <li>💦 По-добра хидратация</li>
          <li>💦 Намалява възпаленията</li>
          <li>💦 Помага за чиста кожа и здрави стави</li>
        </ul>
        <p>Hydrowise побира 420 мл вода. Три лесни стъпки: напълни с вода, натисни бутона и изчакай синята светлина.</p>
        <p>Бутилката издържа между 2 и 6 години в зависимост от честотата на употреба. С едно зареждане извършва 12–15 цикъла на инфузия без загуба на мощност.</p>
      `,
      status: "ACTIVE",
      images: { create: [{ url: "/brand/product-bottle.svg", position: 0 }] },
      variants: {
        create: [
          {
            title: "1 бутилка",
            priceEur: 72.99,
            compareAtEur: 79.99,
            stock: 0,
            isDefault: true,
          },
        ],
      },
    },
  });

  await db.product.upsert({
    where: { slug: "elektroliti-hydrowise" },
    update: {},
    create: {
      slug: "elektroliti-hydrowise",
      title: "Електролити Hydrowise - чиста енергия и фокус за уморени хора",
      descriptionHtml: `
        <ul>
          <li>⚡ По-малко умора от първия ден</li>
          <li>🧠 По-ясна глава и фокус</li>
          <li>☕ Енергия без кофеин и без сривове</li>
        </ul>
        <p><strong>Съставки на доза:</strong></p>
        <ul>
          <li>Калий – 600 mg</li>
          <li>Натрий – 400 mg</li>
          <li>Магнезий – 250 mg</li>
          <li>Таурин – 500 mg</li>
          <li>Глюкоза – 1000 mg</li>
          <li>B-комплекс – ~100–150% NRV</li>
          <li>Цинк – 8 mg</li>
          <li>Селен – 55 µg</li>
        </ul>
        <p>Разтвори 1 доза в нормална вода. Изпий я спокойно, на малки глътки – сутрин, през деня или вечер.</p>
      `,
      status: "ACTIVE",
      images: { create: [{ url: "/brand/product-electrolytes.png", position: 0 }] },
      variants: {
        create: [
          {
            title: "1 брой",
            priceEur: 19.99,
            compareAtEur: 29.99,
            stock: 0,
            isDefault: true,
          },
        ],
      },
    },
  });

  await db.product.upsert({
    where: { slug: "shiladzhit" },
    update: {},
    create: {
      slug: "shiladzhit",
      title: "Натурална формула за жизненост и спокойствие - с Хималайски Шиладжит",
      descriptionHtml: `
        <ul>
          <li>🍃 Дава ти стабилен енергиен баланс</li>
          <li>🍃 Облекчава стреса и напрежението</li>
          <li>🍃 Подпомага паметта и концентрацията</li>
          <li>🍃 Подпомага здравия имунитет</li>
          <li>🍃 Натурални съставки от растителен произход</li>
        </ul>
        <p><strong>Съставки на таблетка:</strong></p>
        <ul>
          <li>Шиладжит – 60 mg</li>
          <li>Ашваганда – 200 mg</li>
          <li>Трибулус – 125 mg</li>
          <li>Пиперин – 5 mg</li>
          <li>Витамин Б6 – 18 mg</li>
        </ul>
        <p>Препоръчителен прием: 1 таблетка дневно, за предпочитане по време на хранене с чаша вода.</p>
      `,
      status: "ACTIVE",
      images: { create: [{ url: "/brand/product-shilajit.png", position: 0 }] },
      variants: {
        create: [
          {
            title: "1 бутилка",
            priceEur: 19.99,
            compareAtEur: 24.99,
            stock: 20,
            isDefault: true,
          },
        ],
      },
    },
  });

  console.log("Seed complete: 3 real Hydrowise products created/updated.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
