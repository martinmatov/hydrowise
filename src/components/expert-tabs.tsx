"use client";

import { useState } from "react";
import Image from "next/image";

type Expert = { name: string; image: string; bio: string };

export function ExpertTabs({ experts }: { experts: Expert[] }) {
  const [active, setActive] = useState(0);
  const expert = experts[active];

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {experts.map((e, i) => (
          <button
            key={e.name}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              i === active
                ? "border-brand bg-brand text-white"
                : "border-neutral-300 text-neutral-600 hover:border-brand hover:text-brand-dark"
            }`}
          >
            {e.name}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
        <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={expert.image}
            alt={expert.name}
            width={480}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{expert.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">{expert.bio}</p>
        </div>
      </div>
    </div>
  );
}
