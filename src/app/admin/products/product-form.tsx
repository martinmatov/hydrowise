type ProductFormValues = {
  title: string;
  slug: string;
  descriptionHtml: string | null;
  status: string;
  imageUrl: string;
  priceEur: string;
  compareAtEur: string;
  stock: number;
};

export function ProductForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<ProductFormValues>;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700">Заглавие</label>
        <input
          name="title"
          required
          defaultValue={defaultValues?.title}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Slug (за URL адреса)
        </label>
        <input
          name="slug"
          required
          defaultValue={defaultValues?.slug}
          pattern="[a-z0-9-]+"
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Описание (HTML)
        </label>
        <textarea
          name="descriptionHtml"
          rows={6}
          defaultValue={defaultValues?.descriptionHtml ?? ""}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 font-mono text-xs"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">Статус</label>
        <select
          name="status"
          defaultValue={defaultValues?.status ?? "ACTIVE"}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        >
          <option value="ACTIVE">Активен</option>
          <option value="DRAFT">Чернова</option>
          <option value="ARCHIVED">Архивиран</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          URL на изображение
        </label>
        <input
          name="imageUrl"
          defaultValue={defaultValues?.imageUrl}
          placeholder="/brand/... или https://..."
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Цена (€)</label>
          <input
            name="priceEur"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={defaultValues?.priceEur}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Стара цена (€)
          </label>
          <input
            name="compareAtEur"
            type="number"
            step="0.01"
            min="0"
            defaultValue={defaultValues?.compareAtEur}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Наличност</label>
          <input
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={defaultValues?.stock}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Запази
      </button>
    </form>
  );
}
