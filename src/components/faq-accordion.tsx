"use client";

import { useState } from "react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium"
            >
              {item.q}
              <span className={`ml-4 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen ? (
              <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-600">{item.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
