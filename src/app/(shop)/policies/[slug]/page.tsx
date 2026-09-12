import { notFound } from "next/navigation";

const TITLES: Record<string, string> = {
  "obshti-uslovia": "Общи условия",
  poveritelnost: "Политика за поверителност",
  vrashtane: "Политика за връщане",
  kontakti: "Информация за контакт",
};

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = TITLES[slug];

  if (!title) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 text-neutral-500">
        Съдържанието на тази страница предстои да бъде добавено.
      </p>
    </div>
  );
}
