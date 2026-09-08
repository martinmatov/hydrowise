import { Resend } from "resend";
import { customerConfirmationHtml, adminNotificationHtml, type OrderEmailData } from "@/emails/templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendOrderEmails(
  order: OrderEmailData & { email: string | null }
): Promise<void> {
  if (!resend || !process.env.EMAIL_FROM) {
    console.warn("Resend not configured — skipping order emails.");
    return;
  }

  const from = process.env.EMAIL_FROM;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  const sends: Promise<unknown>[] = [];

  if (order.email) {
    sends.push(
      resend.emails.send({
        from,
        to: order.email,
        subject: `Поръчка №${order.orderNumber} е приета — Hydrowise`,
        html: customerConfirmationHtml(order),
      })
    );
  }

  if (adminEmail) {
    sends.push(
      resend.emails.send({
        from,
        to: adminEmail,
        subject: `Нова поръчка №${order.orderNumber}`,
        html: adminNotificationHtml(order),
      })
    );
  }

  const results = await Promise.allSettled(sends);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Failed to send order email:", result.reason);
    }
  }
}
