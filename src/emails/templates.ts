import { formatEur } from "@/lib/currency";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type OrderEmailData = {
  orderNumber: number;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string | null;
  notes: string | null;
  items: { titleSnapshot: string; quantity: number; priceEurSnapshot: number | string }[];
  subtotalEur: number | string;
  shippingEur: number | string;
  totalEur: number | string;
};

const wrap = (title: string, body: string) => `
<!DOCTYPE html>
<html lang="bg">
  <body style="margin:0;padding:24px;background:#f5f5f4;font-family:Arial,Helvetica,sans-serif;color:#171717;">
    <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:#0d9488;padding:20px 24px;">
          <span style="color:#ffffff;font-size:18px;font-weight:600;">Hydrowise</span>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <h1 style="font-size:18px;margin:0 0 16px;">${title}</h1>
          ${body}
        </td>
      </tr>
    </table>
  </body>
</html>
`;

function itemsTable(items: OrderEmailData["items"]) {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#404040;">${escapeHtml(item.titleSnapshot)} × ${item.quantity}</td>
        <td style="padding:6px 0;font-size:14px;text-align:right;">${formatEur(
          Number(item.priceEurSnapshot) * item.quantity
        )}</td>
      </tr>`
    )
    .join("");

  return `<table role="presentation" width="100%" style="border-collapse:collapse;margin-top:8px;">${rows}</table>`;
}

function totalsTable(data: OrderEmailData) {
  return `
    <table role="presentation" width="100%" style="border-collapse:collapse;margin-top:12px;border-top:1px solid #e5e5e5;padding-top:8px;">
      <tr>
        <td style="padding:4px 0;font-size:13px;color:#737373;">Междинна сума</td>
        <td style="padding:4px 0;font-size:13px;text-align:right;">${formatEur(data.subtotalEur)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:#737373;">Доставка</td>
        <td style="padding:4px 0;font-size:13px;text-align:right;">${
          Number(data.shippingEur) === 0 ? "Безплатна" : formatEur(data.shippingEur)
        }</td>
      </tr>
      <tr>
        <td style="padding:8px 0 0;font-size:15px;font-weight:600;">Общо (в брой при доставка)</td>
        <td style="padding:8px 0 0;font-size:15px;font-weight:600;text-align:right;">${formatEur(
          data.totalEur
        )}</td>
      </tr>
    </table>
  `;
}

export function customerConfirmationHtml(data: OrderEmailData): string {
  const body = `
    <p style="font-size:14px;color:#404040;margin:0 0 16px;">
      Здравей, ${escapeHtml(data.customerName)}! Поръчка №${data.orderNumber} е приета.
      Ще се свържем с теб по телефона на ${escapeHtml(data.phone)} за потвърждение преди доставка.
      Плащането е в брой при доставка на адрес: ${escapeHtml(data.address)}, ${escapeHtml(data.city)}${
        data.postalCode ? " " + escapeHtml(data.postalCode) : ""
      }.
    </p>
    ${itemsTable(data.items)}
    ${totalsTable(data)}
  `;
  return wrap("Благодарим за поръчката!", body);
}

export function adminNotificationHtml(data: OrderEmailData): string {
  const body = `
    <p style="font-size:14px;color:#404040;margin:0 0 16px;">
      Нова поръчка №${data.orderNumber}<br/>
      Клиент: ${escapeHtml(data.customerName)}<br/>
      Телефон: ${escapeHtml(data.phone)}<br/>
      Адрес: ${escapeHtml(data.address)}, ${escapeHtml(data.city)}${
        data.postalCode ? " " + escapeHtml(data.postalCode) : ""
      }<br/>
      ${data.notes ? `Бележка: ${escapeHtml(data.notes)}<br/>` : ""}
    </p>
    ${itemsTable(data.items)}
    ${totalsTable(data)}
  `;
  return wrap(`Нова поръчка №${data.orderNumber}`, body);
}
