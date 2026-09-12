"use client";

import { useState } from "react";
import { formatEur } from "@/lib/currency";
import { addToCartAction } from "@/actions/cart";

type Variant = {
  id: string;
  title: string;
  priceEur: string;
  compareAtEur: string | null;
  stock: number;
};

export function BundleSelector({ variants }: { variants: Variant[] }) {
  const [selected, setSelected] = useState(variants[0]?.id);
  const mostPopularIndex = variants.length >= 2 ? 1 : -1;
  const bestValueIndex = variants.length - 1;

  return (
    <form action={addToCartAction} className="space-y-4">
      <input type="hidden" name="variantId" value={selected} />
      <input type="hidden" name="quantity" value={1} />

      <div className={`grid gap-3 ${variants.length > 1 ? "grid-cols-2 sm:grid-cols-4" : ""}`}>
        {variants.map((variant, i) => {
          const isSelected = variant.id === selected;
          const freeShipping = i >= 2;
          return (
            <label
              key={variant.id}
              className={`relative flex cursor-pointer flex-col items-center gap-1 rounded-lg border px-3 pb-3 pt-6 text-center transition-colors ${
                isSelected ? "border-brand bg-brand-tint" : "border-neutral-200"
              }`}
            >
              {i === mostPopularIndex ? (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                  Най-поръчвано
                </span>
              ) : i === bestValueIndex && bestValueIndex !== mostPopularIndex ? (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-gold px-2 py-0.5 text-[10px] font-bold text-white">
                  Най-изгодно
                </span>
              ) : null}

              <input
                type="radio"
                name="variantChoice"
                checked={isSelected}
                onChange={() => setSelected(variant.id)}
                className="sr-only"
              />

              <span className="text-sm font-semibold">{variant.title}</span>
              <span className="text-sm font-bold text-brand-dark">
                {formatEur(variant.priceEur)}
              </span>
              {variant.compareAtEur ? (
                <span className="text-xs text-neutral-400 line-through">
                  {formatEur(variant.compareAtEur)}
                </span>
              ) : null}
              {freeShipping ? (
                <span className="mt-1 rounded bg-brand-tint px-1.5 py-0.5 text-[10px] font-semibold text-brand-dark">
                  БЕЗПЛАТНА ДОСТАВКА
                </span>
              ) : null}
            </label>
          );
        })}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
      >
        Поръчай сега
      </button>
    </form>
  );
}
