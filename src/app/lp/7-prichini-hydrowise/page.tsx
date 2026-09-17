import Image from "next/image";
import { Golos_Text } from "next/font/google";
import { StarRating } from "@/components/star-rating";

const golos = Golos_Text({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"] });

const MONTHS_BG = [
  "януари", "февруари", "март", "април", "май", "юни",
  "юли", "август", "септември", "октомври", "ноември", "декември",
];

function formatBgDate(date: Date) {
  return `${date.getDate()} ${MONTHS_BG[date.getMonth()]} ${date.getFullYear()}`;
}

const REASONS = [
  {
    n: 1,
    title: "Сутрешната рутина решава повече, отколкото мислех",
    body:
      "Първите 30 минути след събуждане задават тона за целия ден. Промених само едно нещо: вместо телефон — чаша вода. Малка промяна. Голяма разлика.",
    image: "/lp/point-1.png",
  },
  {
    n: 2,
    title: "Не цялата вода е еднаква",
    body:
      "Това ме изненада най-много. Оказва се, че обикновената вода хидратира тялото, но не и клетките му по същия начин. Дъщеря ми ми показа нещо, за което не бях чувала: портативна бутилка, която обогатява водата с водород. Звучеше странно. Но зад него стоят над 2000 научни изследвания. И тук е моментът, в който трябва да съм честна с Вас — не купих това заради науката. Купих го, защото бях отчаяна. Науката дойде после, като потвърждение. Резултатът? Клетъчна хидратация. Антиоксидантна защита. И нещо, което усетих директно: по-стабилна енергия през деня. Не драматична трансформация. Тихо, стабилно усещане, че тялото ми работи с мен, а не срещу мен.",
    image: "/lp/point-2.png",
  },
  {
    n: 3,
    title: "Движението не трябва да е интензивно, за да работи",
    body:
      "20 минути ходене навън правят повече за енергията ми, отколкото очаквах. Не спорт. Просто движение.",
    image: "/lp/point-3.png",
  },
  {
    n: 4,
    title: "Кафето след 14:00 ми вредеше повече, отколкото си признавах",
    body: "Спрях го. Съня ми стана по-стабилен. Сутрините — по-леки. Резултатът дойде за по-малко от седмица.",
    image: "/lp/point-4.png",
  },
  {
    n: 5,
    title: "Малките хранения държат енергията по-равномерна",
    body:
      "Вместо три големи хранения, преминах на по-чести и по-леки. Без резки спадове следобед. Без глад в 16:00, който ме караше да посягам към сладко.",
    image: "/lp/point-5.png",
  },
  {
    n: 6,
    title: "Достатъчно вода — но истински достатъчно",
    body:
      "Не просто \"пий повече вода\" съвет. Конкретно проследяване през деня. В комбинация с точка 2, това направи най-голямата разлика от всичко в списъка.",
    image: "/lp/point-6.png",
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
          Шест неща, които научих на 58, за да имам повече енергия
        </h1>
        <p className="mt-3 text-[17px] italic leading-[1.6] text-body">
          (Едно от тях изобщо нямаше нищо общо с диета или спорт — а с това, което пия всяка
          сутрин)
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/lp/avatar.png"
              alt="Петя Илиева"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Петя Илиева</p>
            <p className="text-xs text-body">Последна актуализация: {formatBgDate(new Date())}</p>
          </div>
        </div>
      </section>

      {/* Block C — narrative lead-in */}
      <section className="mx-auto max-w-[680px] px-6 pt-10">
        <p className="text-[17px] leading-[1.6] text-body">
          Цяла година се чувствах уморена по начин, който не можех да си обясня.
        </p>
        <p className="mt-3 text-[17px] leading-[1.6] text-body">
          Не беше стрес. Не беше липса на сън. Просто тялото ми работеше на половин обороти — и
          никой не можеше да ми каже защо.
        </p>
        <p className="mt-3 text-[17px] leading-[1.6] text-body">
          Затова спрях да гадая. Седнах и си направих сметка какво точно ми отнема енергия през
          деня:
        </p>
        <p className="mt-3 text-[17px] leading-[1.6] text-body">
          2 часа сутрешна летаргия + следобеден спад около 15:00 + безсънни нощи заради кофеин +
          постоянно усещане за „недохидратирана“... = цял ден, прекаран в догонване на самата
          себе си.
        </p>
        <p className="mt-3 text-[17px] leading-[1.6] text-body">
          Затова реших да променя нещата едно по едно. Ето какво научих.
        </p>
      </section>

      {/* Block D — six things learned */}
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
          </section>
        ))}

        <section className="mt-16">
          <p className="text-[17px] leading-[1.6] text-body">
            Честно казано, не очаквах точка 2 да е тази, която променя всичко. Но е точно така.
          </p>
          <p className="mt-3 text-[17px] leading-[1.6] text-body">
            Резултатите могат да варират според индивида — но при мен разликата беше достатъчна, за
            да продължа. И да го споделя с Вас.
          </p>
          <p className="mt-6 text-[17px] font-semibold leading-[1.6] text-brand-dark">
            👉 Ако искате да пробвате и Вие: 60-дневна гаранция за връщане на парите.
          </p>
        </section>
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
    </div>
  );
}
