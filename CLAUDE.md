@AGENTS.md

# Frontend Design Rules

## Always do first
- **Invoke the `frontend-design` skill before touching any frontend code** — every time the user asks for a visual/UI change on the site, however small (a color tweak, a new section, a copy edit that affects layout). Not just once per session. This keeps the whole site at one consistent design quality bar instead of drifting per-request.

## Reference images / live site comparison
- If a reference image or live-site screenshot is provided: match layout, spacing, typography, and color as closely as possible. Do not "improve" or add sections beyond what the reference shows unless asked.
- Screenshot the working page, compare against the reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds before calling a visual task done.

## Local server & screenshots
- Dev server: `npm run dev` (serves at `http://localhost:3000`). Check if it's already running (`Get-NetTCPConnection -LocalPort 3000` on Windows, or `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`) before starting another — Windows process-tree kills can take the whole server down, not just one process, so kill by PID from the port lookup, never by killing all `node` processes.
- Screenshot a running page: `node scripts/screenshot.mjs http://localhost:3000 [label]` — saves to `./temporary screenshots/screenshot-N[-label].png` (gitignored, never overwritten). Read the PNG back with the Read tool to actually look at it.
- Playwright is a project devDependency; for interactive flows (clicking, filling forms) or tight crops/high-DPI checks, write a one-off script rather than relying only on the default full-page screenshot.
- Prefer `page.locator(selector, { hasText })` or `getByText` over `waitForSelector("text=...")` for Cyrillic/non-ASCII text — the latter has been flaky in this project.
- Images can be lazy-loaded — if a screenshot shows a blank box where an image should be, scroll it into view and wait before concluding it's broken.

## Brand assets
- Check `brand_assets/` for anything the user has dropped in (logos, brand guideline exports, product photos) before designing — use real assets over placeholders whenever they exist.
- Real, already-integrated brand assets live in `public/brand/` and `public/logo.png`.
- Brand colors are CSS variables in `src/app/globals.css` (`--brand`, `--brand-dark`, `--brand-tint`, `--brand-gold`, `--brand-check`, `--brand-star`) exposed as Tailwind utilities (`bg-brand`, `text-brand-dark`, `bg-brand-tint`, etc.). Use those, not default Tailwind blue/indigo — and don't invent new brand colors if the guideline already defines one for that role.
- **Font: Golos Text, not Manrope**, despite Manrope being named in the original brand guideline doc. Tested and confirmed: Manrope renders several Cyrillic lowercase letters (е, т, д, в) in unconventional, Latin-look-alike shapes that hurt legibility, especially for older readers. Golos Text (the guideline's own listed fallback) renders clean, conventional Cyrillic. Load via `next/font/google` with `subsets: ["latin", "cyrillic"]`.

## Copywriting
- Before writing or rewriting any sales/marketing copy (headlines, reasons, CTAs, page body text), read `copywriting/Copywriting.MD` in full and apply its direct-response frameworks (headline formulas, curiosity gaps, bucket brigades, rhythm, the "so what?" chain, etc.).
- Write at a simple, plain-language reading level — roughly 5th grade. Short sentences, common words. Medical/technical terms (e.g. LDL, oxidative stress) can be mentioned in passing but must never be the focus of a sentence — most readers don't know what they mean and don't want to.

## Content honesty
- Still don't fabricate customer reviews, testimonials, or people (e.g. a named "author" byline implying a credential — like a medical authority — nobody actually holds), and don't invent statistics with no source. Where real copy/photos/reviews are needed but not yet provided, use a clearly marked placeholder (dashed border, muted text, or a labeled placehold.co image) rather than inventing content — and say so.
- Do not add payment-method badges (Visa/Mastercard/etc.) — this store is Cash-on-Delivery only; showing card logos would misrepresent how customers can pay.
- **Exception, by explicit user instruction (2026-09-12):** the Hydrowise listicle page (`/lp/7-prichini-hydrowise`) no longer follows the banned-claims/health-claims-regulation framework from `Hydrowise_Listicle_AI_Guideline.md` — the user reviewed the risk and chose to waive it for that page. Direct benefit claims are fine there as long as they're truthful and traceable to a real, cited source (no fabricated stats). Don't reintroduce the old hedging/disclaimer language on that page unless the user asks for it back.

## General guardrails
- Every clickable element needs a hover state at minimum.
- Use intentional spacing (Tailwind's default scale is fine — just be consistent, not random).
- Buttons/cards use `rounded-lg`, not `rounded-full`, to match the live site's style (circular shapes are reserved for avatars/icons/small tag badges) — unless faithfully reproducing a reference design that specifically uses pill-shaped tags.
