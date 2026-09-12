"use client";

import { useActionState } from "react";
import { placeOrder, type CheckoutState } from "@/actions/checkout";

const initialState: CheckoutState = {};

export function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(placeOrder, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Име и фамилия
        </label>
        <input
          name="customerName"
          required
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        />
        {state.fieldErrors?.customerName ? (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.customerName}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Телефон
        </label>
        <input
          name="phone"
          type="tel"
          required
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        />
        {state.fieldErrors?.phone ? (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.phone}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Имейл (по желание — за потвърждение на поръчката)
        </label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        />
        {state.fieldErrors?.email ? (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Адрес
        </label>
        <input
          name="address"
          required
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        />
        {state.fieldErrors?.address ? (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.address}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Град
          </label>
          <input
            name="city"
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
          {state.fieldErrors?.city ? (
            <p className="mt-1 text-xs text-red-600">{state.fieldErrors.city}</p>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Пощенски код
          </label>
          <input
            name="postalCode"
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Бележка към поръчката (по желание)
        </label>
        <textarea
          name="notes"
          rows={2}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {isPending ? "Изпращане..." : "Поръчай с наложен платеж"}
      </button>
    </form>
  );
}
