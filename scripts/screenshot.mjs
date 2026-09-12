import { chromium } from "playwright";
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:3000";
const label = process.argv[3];

const dir = "temporary screenshots";
mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter((f) => f.startsWith("screenshot-"));
const n = existing.length + 1;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.screenshot({ path: join(dir, filename), fullPage: true });
await browser.close();

console.log(`Saved ${join(dir, filename)}`);
