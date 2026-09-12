const MONTHS_BG = [
  "Яну", "Фев", "Март", "Апр", "Май", "Юни",
  "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек",
];

function fmt(date: Date) {
  return `${date.getDate()}. ${MONTHS_BG[date.getMonth()]}.`;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function DeliveryTimeline() {
  const today = new Date();
  const ready = addDays(today, 1);
  const deliveredFrom = addDays(today, 2);
  const deliveredTo = addDays(today, 3);

  const steps = [
    {
      label: "Поръчана",
      date: fmt(today),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      label: "Поръчката ви е готова",
      date: fmt(ready),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="7" width="15" height="10" rx="1" />
          <path d="M16 10h3.5L23 13.5V17h-7" />
          <circle cx="6" cy="19" r="1.5" />
          <circle cx="18" cy="19" r="1.5" />
        </svg>
      ),
    },
    {
      label: "Доставена",
      date: `${fmt(deliveredFrom)} - ${fmt(deliveredTo)}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7" />
          <path d="M1 8l11-6 11 6-11 6z" />
          <path d="M12 14v7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-1 flex-col items-center text-center">
          <div className="flex w-full items-center">
            {i > 0 ? <div className="h-px flex-1 bg-neutral-300" /> : <div className="flex-1" />}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--foreground)] text-white">
              {step.icon}
            </div>
            {i < steps.length - 1 ? <div className="h-px flex-1 bg-neutral-300" /> : <div className="flex-1" />}
          </div>
          <p className="mt-2 text-xs font-semibold">{step.date}</p>
          <p className="text-xs text-body">{step.label}</p>
        </div>
      ))}
    </div>
  );
}
