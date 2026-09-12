import Image from "next/image";
import { Golos_Text } from "next/font/google";
import { StarRating } from "@/components/star-rating";
import { StickyMobileCta } from "@/components/listicle/sticky-mobile-cta";

const golos = Golos_Text({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"] });

const MONTHS_BG = [
  "януари", "февруари", "март", "април", "май", "юни",
  "юли", "август", "септември", "октомври", "ноември", "декември",
];

function formatBgDate(date: Date) {
  return `${date.getDate()} ${MONTHS_BG[date.getMonth()]} ${date.getFullYear()}`;
}

const ALTERNATIVES_ROWS = [
  {
    label: "Усилие",
    hydrowise: "Напълнете, натиснете, изчакайте (30 сек.)",
    cheap: "Същото, но без данни за издръжливост",
    nothing: "Продължавате постарому",
  },
  {
    label: "Гаранция",
    hydrowise: "60 дни за връщане",
    cheap: "Обикновено няма или е силно ограничена",
    nothing: "Няма",
  },
  {
    label: "Поддръжка",
    hydrowise: "Българска фирма, реален човек по телефона",
    cheap: "Чуждестранен продавач, бавен отговор",
    nothing: "Няма",
  },
  {
    label: "Независим лабораторен тест",
    hydrowise: "В процес на изготвяне",
    cheap: "Почти никога не се предоставя",
    nothing: "Няма",
  },
  {
    label: "Разход във времето",
    hydrowise: "Еднократна инвестиция",
    cheap: "Често се чупи, купувате отново",
    nothing: "Без промяна в разходите",
  },
];

const REASONS = [
  {
    n: 1,
    title: "Грижите се за сърцето си с всяка чаша",
    body:
      "Учени изследвали хора с високо кръвно и висок холестерол. След осем седмици на водородна вода, кръвните им изследвания видимо се подобрили. Hydrowise прави същото, чаша по чаша. А ако след 60 дни не усетите разликата, връщаме Ви парите.",
    image: "/lp/reason-1-heart.png",
  },
  {
    n: 2,
    title: "Още ви се пие кафе? Пийте го.",
    body:
      "Не искаме да се отказвате от нищо, което обичате. Hydrowise не се опитва да замени кафето Ви. Целта е друга: в дългосрочен план потенциално да помогне на енергията Ви на клетъчно ниво, чаша по чаша.",
    image: "/lp/reason-2-coffee.png",
  },
  {
    n: 3,
    title: "Учените вече изследват водорода от години",
    body:
      "Вече има над 2000 научни изследвания за водородната вода. Учените тепърва откриват нови ползи. Това, което знаем досега, вече е достатъчно добро.",
    image: "/lp/reason-3-research.png",
  },
  {
    n: 4,
    title: "Не купувате същата бутилка на всеки шест месеца",
    body:
      "Евтините бутилки от маркетплейсите често се чупят след няколко месеца и се връщате на старт. Hydrowise е направена да Ви служи години. Не Ви допадне ли? Връщате я в първите 60 дни, без обяснения.",
    image: "/lp/reason-4-comparison.png",
  },
  {
    n: 5,
    title: "Тялото Ви само се чисти от вредното",
    body:
      "През 2007 г. учени открили нещо изненадващо. Водородът унищожава само вредните частици в тялото Ви, а добрите оставя непокътнати. Малко неща умеят да бъдат толкова точни. Оттогава водородът е сред най-проучваните антиоксиданти в света. За Вас това означава по-малко увреждане на клетките с годините, тихо и без странични ефекти.",
    image: "/lp/reason-5-cells.png",
    sourceUrl: "https://doi.org/10.1038/nm1577",
    sourceLabel: "Прочетете изследването (Nature Medicine, 2007)",
  },
  {
    n: 6,
    title: "Ставите Ви се събуждат по-леко",
    body:
      "Знаете усещането — скована сутрин, докато тялото Ви бавно се разбужда. Много хора, които пият водородна вода редовно, забелязват точно обратното: стават по-леко, движат се по-свободно, без сутрешната скованост. Малка промяна в чашата вода може да означава голяма разлика в първите минути на деня Ви.",
    image: "/lp/reason-6-stretch.png",
  },
  {
    n: 7,
    title: "Благодарим Ви, че стигнахте дотук",
    body:
      "Малко хора четат чак до края. Това ни казва, че наистина Ви е грижа. Затова Ви правим по-лесно да опитате Hydrowise — с 10% отстъпка, само за читателите на тази страница.",
    image: "/lp/reason-7-gift.png",
  },
];

const VERIFIED_REVIEWS = [
  {
    name: "Николай Димитров",
    stars: 5,
    title: "Уникална бутилка!",
    body: "Само нея ползвам вече. Първоначално бях много скептичен, но сега само мога да я препоръчам с две ръце!",
  },
  {
    name: "Христо Денев",
    stars: 5,
    title: "Доволен клиент",
    body: "Изключително съм доволен от експресното и лоялното отношение, както и от самата водородна бутилка! Препоръчвам я с две ръце! Бъдете здрави и благословени! :)",
  },
  {
    name: "Мариана Мариана",
    stars: 5,
    title: "Много съм доволна!",
    body: "Взех за себе си и подарък на дъщеря ми!",
  },
];

export default function ListiclePage() {
  return (
    <div className={`${golos.className} bg-white`}>
      {/* Block B — hero */}
      <section className="mx-auto max-w-[680px] px-6 pt-10 sm:pt-16">
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-brand-tint">
          <Image
            src="/lp/hero.png"
            alt="Човек държи бутилка Hydrowise у дома"
            width={800}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <h1 className="mt-8 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          7 причини все повече хора преминават към водородна вода
        </h1>
        <p className="mt-4 text-[17px] leading-[1.6] text-body">
          Ако напоследък нищо не Ви помага да се чувствате енергични, вероятно сте виждали
          реклама за водородна вода и сте се запитали дали е измама или просто ненужен разход.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
            HW
          </div>
          <div>
            <p className="text-sm font-semibold">От екипа на Hydrowise</p>
            <p className="text-xs text-body">Последна актуализация: {formatBgDate(new Date())}</p>
          </div>
        </div>

        <div className="mt-10 rounded-lg border-l-4 border-brand bg-brand-tint px-5 py-4">
          <p className="text-[17px] font-semibold italic leading-[1.6] text-brand-dark">
            „Прочетете това, ако сте пробвали почти всичко и нищо не Ви е дало трайна енергия“
          </p>
        </div>
      </section>

      {/* Block D — seven reasons */}
      <div className="mx-auto max-w-[680px] px-6 pt-10">
        {REASONS.map((reason, i) => (
          <section key={reason.n} className={i > 0 ? "mt-16" : ""}>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-brand-tint">
              <Image
                src={reason.image}
                alt=""
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-6 text-3xl font-extrabold text-brand">{reason.n}</p>
            <h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
              {reason.title}
            </h2>
            <p className="mt-3 max-w-[65ch] text-[17px] leading-[1.6] text-body">{reason.body}</p>
            {reason.n === 4 ? (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="w-1/4" />
                      <th className="rounded-t-lg bg-brand px-3 py-2 text-center font-semibold text-white">
                        Hydrowise
                      </th>
                      <th className="bg-neutral-100 px-3 py-2 text-center font-semibold">
                        Евтина бутилка (маркетплейс)
                      </th>
                      <th className="bg-neutral-100 px-3 py-2 text-center font-semibold">
                        Без промяна
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALTERNATIVES_ROWS.map((row, ri) => (
                      <tr key={row.label} className={ri % 2 === 1 ? "bg-neutral-50" : ""}>
                        <td className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-body">
                          {row.label}
                        </td>
                        <td className="bg-brand-tint px-3 py-3 text-center font-medium text-brand-dark">
                          {row.hydrowise}
                        </td>
                        <td className="px-3 py-3 text-center text-body">{row.cheap}</td>
                        <td className="px-3 py-3 text-center text-body">{row.nothing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {reason.sourceUrl ? (
              <a
                href={reason.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-brand-dark underline decoration-brand-tint underline-offset-2 hover:text-brand"
              >
                {reason.sourceLabel}
              </a>
            ) : null}
            {i === 0 ? <div id="listicle-reason-1-end" /> : null}
          </section>
        ))}
      </div>

      {/* Block E — proof */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Какво казват потвърдени клиенти
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VERIFIED_REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="flex justify-center">
                <StarRating value={review.stars} />
              </div>
              <p className="mt-3 text-base font-bold">{review.title}</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-body">{review.body}</p>
              <p className="mt-4 text-sm font-semibold">{review.name}</p>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-brand-dark">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--brand)">
                  <circle cx="12" cy="12" r="12" />
                  <path d="m7 12.5 3 3 7-7" stroke="white" strokeWidth="2" fill="none" />
                </svg>
                Потвърден купувач
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-[680px] grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-brand-tint p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-dark)" strokeWidth="1.8">
              <path d="M3 21h18M6 21V8l6-4 6 4v13M9 21v-6h6v6" />
            </svg>
            <p className="text-sm font-semibold text-brand-dark">Българска фирма</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-brand-tint p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-dark)" strokeWidth="1.8">
              <path d="M1 8h13v8H1z" />
              <path d="M14 11h4l3 3v2h-7" />
              <circle cx="5.5" cy="18" r="1.6" />
              <circle cx="17.5" cy="18" r="1.6" />
            </svg>
            <p className="text-sm font-semibold text-brand-dark">Доставка за 1–2 дни</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-brand-tint p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-dark)" strokeWidth="1.8">
              <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p className="text-sm font-semibold text-brand-dark">60-дневна гаранция</p>
          </div>
        </div>

      </section>

      {/* Block G — close */}
      <section className="bg-brand-tint px-6 py-20">
        <div className="mx-auto max-w-[680px]">
          <div className="relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-5 py-1.5 text-xs font-bold text-white shadow">
              ОФЕРТА ЗА ЧИТАТЕЛИ
            </span>
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg sm:flex">
              <div className="aspect-square w-full overflow-hidden bg-brand-tint sm:w-1/2">
                <Image
                  src="/lp/offer-trio.png"
                  alt="Hydrowise"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex w-full flex-col justify-center p-8 text-center sm:w-1/2 sm:text-left">
                <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark">
                  10% отстъпка за читателите
                </h2>
                <p className="mt-3 text-[15px] leading-[1.6] text-body">
                  Тази отстъпка е налична само за хора, стигнали чак дотук. Използвайте кода при
                  поръчка.
                </p>
                <div className="mt-4 inline-flex items-center justify-center gap-2 self-center rounded-lg border-2 border-dashed border-brand bg-brand-tint px-4 py-2.5 sm:self-start">
                  <span className="text-lg font-extrabold tracking-wide text-brand-dark">
                    DOSTAVKA10
                  </span>
                </div>
                <a
                  href="https://hydrowise.health/products/hydrowise"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-dark"
                  style={{ minHeight: 48 }}
                >
                  Поръчайте сега →
                </a>
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-dark">
                    Доставка за 1–2 дни
                  </span>
                  <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-dark">
                    60-дневна гаранция
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-body">
            Опитайте Hydrowise с 60-дневна гаранция за връщане на парите.
          </p>
        </div>
      </section>

      <StickyMobileCta
        href="https://hydrowise.health/products/hydrowise"
        label="Разгледайте Hydrowise"
      />
    </div>
  );
}
