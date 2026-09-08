import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

const db = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: tsx scripts/create-admin.ts <email> [password]");
    process.exit(1);
  }

  const password = process.argv[3] ?? randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(password, 12);

  await db.admin.upsert({
    where: { email: email.toLowerCase() },
    update: { passwordHash },
    create: { email: email.toLowerCase(), passwordHash },
  });

  console.log(`Admin ready: ${email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
