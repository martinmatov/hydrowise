"use client";

import { useEffect, useRef, useState } from "react";

export function StickyMobileCta({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = document.getElementById("listicle-reason-1-end");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      <a
        href={href}
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-center bg-brand px-6 py-4 text-sm font-bold text-white transition-transform sm:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ minHeight: 48 }}
      >
        {label}
      </a>
    </div>
  );
}
