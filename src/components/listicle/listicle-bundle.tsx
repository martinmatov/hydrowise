"use client";

import { useState } from "react";
import { formatEur } from "@/lib/currency";
import { addToCartAction } from "@/actions/cart";

type Variant = { id: string; title: string; priceEur: string };

const USAGE_LABELS: Record<number, string> = {
  0: "Само за Вас",
  1: "За Вас + за човек, за когото Ви е грижа",
  2: "За Вас и двама близки хора",
  3: "За цялото домакинство",
};

export function ListicleBundle({ variants }: { variants: Variant[] }) {
  const [selected, setSelected] = useState(variants[0]?.id);

  return (
    <form action={addToCartAction} className="space-y-4">
      <input type="hidden" name="variantId" value={selected} />
      <input type="hidden" name="quantity" value={1} />

      <div className="space-y-2">
        {variants.map((variant, i) => {
          const isSelected = variant.id === selected;
          return (
            <label
              key={variant.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
                isSelected ? "border-brand bg-brand-tint" : "border-neutral-200"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="variantChoice"
                  checked={isSelected}
                  onChange={() => setSelected(variant.id)}
                  className="h-5 w-5 accent-[var(--brand)]"
                />
                <span>
                  <span className="block text-sm font-semibold">{variant.title}</span>
                  <span className="block text-[15px] text-body">{USAGE_LABELS[i]}</span>
                </span>
              </span>
              <span className="text-base font-bold text-brand-dark">
                {formatEur(variant.priceEur)}
              </span>
            </label>
          );
        })}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-brand py-4 text-base font-bold text-white transition-colors hover:bg-brand-dark"
        style={{ minHeight: 48 }}
      >
        Поръчайте сега
      </button>
      <p className="text-center text-[15px] text-body">
        60 дни гаранция за връщане · Плащане в брой при доставка
      </p>
    </form>
  );
}
