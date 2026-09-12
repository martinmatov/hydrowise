import Image from "next/image";
import { StarRating } from "@/components/star-rating";

const TRUST_ITEMS = [
  {
    label: "Фирма в БЪЛГАРИЯ",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M6 21V8l6-4 6 4v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    label: "От над 5000+ проучвания — ГАРАНТИРАН ефект",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 2 8l10 5 10-5-10-5Z" />
        <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      </svg>
    ),
  },
  {
    label: "60 дневна ГАРАНЦИЯ",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Бърза доставка",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M1 8h13v8H1z" />
        <path d="M14 11h4l3 3v2h-7" />
        <circle cx="5.5" cy="18" r="1.6" />
        <circle cx="17.5" cy="18" r="1.6" />
      </svg>
    ),
  },
];

export function TrustBadgeStrip() {
  return (
    <section className="bg-brand py-10 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 text-center">
            {item.icon}
            <p className="text-xs font-semibold leading-snug">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "Антиоксидантна защита",
    body: "Неутрализира свободните радикали и подпомага здравето на клетките.",
  },
  {
    title: "По-добра хидратация",
    body: "Усвоява се бързо и осигурява повече енергия и свежест.",
  },
  {
    title: "Подкрепа за възстановяване",
    body: "Намалява възпаленията и помага на мускулите да се възстановят по-бързо.",
  },
];

export function HowItWorksSection({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-10 text-center text-xl font-semibold tracking-tight sm:text-2xl">
        Как работи генераторът?
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
        <div className="order-2 sm:order-1">
          <h3 className="text-2xl font-semibold tracking-tight">Хидратирай се правилно</h3>
          <p className="mt-4 text-sm leading-relaxed text-body">
            Знаеш ли, че 75% от хората са хронично дехидратирани и пият едва около 2,5 чаши вода
            на ден? Умората, главоболието и липсата на концентрация не са просто резултат от
            стреса в ежедневието — това е начинът, по който тялото ти сигнализира, че има нужда от
            вода. Пиенето на водородна вода хидратира по-бързо и помага да мислиш по-ясно и да се
            чувстваш по-добре през целия ден.
          </p>
          <a
            href="#buy"
            className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Вземи твоето сега 👉
          </a>
        </div>

        <div className="order-1 aspect-square overflow-hidden rounded-lg bg-brand-tint sm:order-2">
          <Image
            src={imageUrl}
            alt="Hydrowise"
            width={600}
            height={600}
            className="h-full w-full object-contain p-10"
          />
        </div>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-lg bg-brand-tint p-5">
            <h4 className="text-sm font-semibold">{f.title}</h4>
            <p className="mt-2 text-sm text-body">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const MARQUEE_WORDS = ["По-чиста кожа", "По-добра хидратация", "Повече енергия"];

export function MarqueeStrip() {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="overflow-hidden bg-brand py-3">
      <div className="animate-marquee flex w-max gap-10 text-sm font-semibold uppercase tracking-wide text-white">
        {[...items, ...items].map((word, i) => (
          <span key={i}>{word}</span>
        ))}
      </div>
    </div>
  );
}

export function WhyItWorksSection({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Защо работи?</h2>
          <p className="mt-4 text-sm leading-relaxed text-body">
            Молекулярният водород е най-малката молекула в света. Благодарение на малкия си
            размер той може да проникне във всяко кътче на клетките, включително в области, до
            които други антиоксиданти не достигат.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-body">
            Попаднал вътре, той неутрализира вредните свободни радикали и подпомага полезните
            процеси в организма. Представи си, че отделяш развалените ябълки и запазваш добрите.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-body">
            Ефектът? По-малко стрес и повече енергия, което ти помага да се чувстваш изключително
            добре. Водородът намалява оксидативния стрес, прави клетките по-здрави и подпомага
            цялостното благосъстояние на организма.
          </p>
          <a
            href="#buy"
            className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Вземи твоето сега 👉
          </a>
        </div>
        <div className="aspect-square overflow-hidden rounded-lg bg-brand-tint">
          <Image
            src={imageUrl}
            alt="Hydrowise"
            width={600}
            height={600}
            className="h-full w-full object-contain p-10"
          />
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { pct: 93, body: "казват, че се чувстват по-добре още след първата употреба." },
  { pct: 92, body: "казват, че са забелязали, че ефектът от водородната вода е дълготраен." },
  { pct: 98, body: "казват, че са били скептични преди покупката, но сега не съжаляват." },
];

export function StatsBanner() {
  return (
    <section className="bg-brand py-16 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-lg font-semibold tracking-tight sm:text-xl">
          Помогнахме на над 500+ човека да се хидратират правилно
        </h2>
        <div className="mt-8 space-y-5">
          {STATS.map((s) => (
            <div key={s.body} className="flex items-center gap-4 border-b border-white/20 pb-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white text-sm font-bold">
                {s.pct}%
              </div>
              <p className="text-sm">
                <span className="font-semibold">{s.pct}%</span> {s.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href="#buy"
            className="inline-flex rounded-lg bg-white px-6 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-tint"
          >
            Вземи твоето сега 👉
          </a>
        </div>
      </div>
    </section>
  );
}

const COMPARISON_ROWS = [
  { label: "Увеличава енергията", hydrowise: true, normal: false },
  { label: "Антиоксидантни свойства", hydrowise: true, normal: false },
  { label: "Увеличава фокуса", hydrowise: true, normal: false },
  { label: "Съдържа тежки метали", hydrowise: false, normal: true },
  { label: "Съдържа пластмаса", hydrowise: true, normal: false },
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-check)" strokeWidth="3">
      <path d="M4 12l6 6L20 6" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function ComparisonTable() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-8 text-center text-xl font-semibold tracking-tight sm:text-2xl">
        Не изпускай тези ползи
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr>
              <th className="w-1/2" />
              <th className="pb-3 text-center font-semibold text-brand-dark">Hydrowise</th>
              <th className="pb-3 text-center font-semibold text-body">Нормална вода</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.label}>
                <td className="py-4 text-xs font-semibold uppercase tracking-wide">{row.label}</td>
                <td className="py-4 text-center">
                  <span className="inline-flex">{row.hydrowise ? <CheckIcon /> : <CrossIcon />}</span>
                </td>
                <td className="py-4 text-center">
                  <span className="inline-flex">{row.normal ? <CheckIcon /> : <CrossIcon />}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const RATING_BREAKDOWN = [
  { stars: 5, count: 22 },
  { stars: 4, count: 5 },
  { stars: 3, count: 2 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];
const TOTAL_REVIEWS = RATING_BREAKDOWN.reduce((sum, r) => sum + r.count, 0);

const REVIEWS = [
  {
    name: "Христо Денев",
    date: "25.06.2025",
    stars: 5,
    title: "Доволен клиент",
    body: "Изключително съм доволен от експресното и лоялното отношение, както и от самата водородна бутилка! Препоръчвам я с две ръце! Бъдете здрави и благословени! :)",
  },
  {
    name: "Мариана Мариана",
    date: "13.12.2025",
    stars: 5,
    title: "Много съм доволна! Взех за себе си и подарък на",
    body: "Много съм доволна! Взех за себе си и подарък на дъщеря ми!",
  },
  {
    name: "Анонимен",
    date: "10.12.2025",
    stars: 4,
    title: null,
    body: "ДОВОЛЕН СЪМ!",
  },
  {
    name: "Румен Иванов",
    date: "09.12.2025",
    stars: 5,
    title: "Доволен",
    body: "Доволен съм",
  },
  {
    name: "Петя Милева",
    date: "08.12.2025",
    stars: 5,
    title: "Много добре е направена Н2-бутилката!",
    body: "Много добре е направена Н2-бутилката! За което Ви поздравявам! Неудобство е само факта, че водата (в цялост) трябва да се консумира в рамките на 15–20 минути (при условие, че я ползва човек от 1-членно домакинство). Благодаря още веднъж! Бъдете здрави!",
  },
];

export function ReviewsSection() {
  const average = RATING_BREAKDOWN.reduce((sum, r) => sum + r.stars * r.count, 0) / TOTAL_REVIEWS;

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-8 text-center text-xl font-semibold tracking-tight sm:text-2xl">
        Отзиви от клиенти
      </h2>

      <div className="flex flex-col items-center gap-6 border-b border-neutral-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2 sm:justify-start">
            <StarRating value={average} />
            <span className="text-sm font-semibold">{average.toFixed(2)} от 5</span>
          </div>
          <p className="mt-1 text-xs text-body">На база {TOTAL_REVIEWS} отзива</p>
        </div>

        <div className="w-full max-w-xs space-y-1">
          {RATING_BREAKDOWN.map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-right">{row.stars}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-brand-star"
                  style={{ width: `${(row.count / TOTAL_REVIEWS) * 100}%` }}
                />
              </div>
              <span className="w-4 text-body">{row.count}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled
          className="rounded-lg border border-neutral-300 px-4 py-2 text-xs font-semibold opacity-60"
        >
          Напишете отзив
        </button>
      </div>

      <div className="divide-y divide-neutral-200">
        {REVIEWS.map((review) => (
          <div key={review.name + review.date} className="py-5">
            <div className="flex items-center justify-between">
              <StarRating value={review.stars} />
              <span className="text-xs text-body">{review.date}</span>
            </div>
            <p className="mt-2 text-sm font-semibold">
              {review.name}{" "}
              <span className="ml-1 rounded bg-brand-tint px-1.5 py-0.5 text-[10px] font-semibold text-brand-dark">
                Проверено
              </span>
            </p>
            {review.title ? <p className="mt-1 text-sm font-semibold">{review.title}</p> : null}
            <p className="mt-1 text-sm leading-relaxed text-body">{review.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
