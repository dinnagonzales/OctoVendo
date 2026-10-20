# Market Day (Expo)

Kid-friendly POS for iPad testing via **Expo Go** — no Apple Developer account required yet.

## Run on your iPad today

1. Install **[Expo Go](https://apps.apple.com/app/expo-go/id982107779)** on your iPad.
2. On your Mac, from this folder:

   ```bash
   npm start
   ```

3. Scan the QR code with your iPad camera (same Wi‑Fi as your Mac).
4. Market Day opens inside Expo Go.

## What's working

- **Home** — Available Items (no sales totals); Market Day ticket banner when open; idle shortcuts (**Start Market Day**, **Update Inventory**, **Go to Sales**) when closed; **Get your shop ready** checklist until first item + Hide (or all optional steps done); **Make a Sale** / **+ Pre-order** when inventory exists
- **First-run setup** — Premium splash (peach canvas + `logo-app` + tagline) → profile → Pass Code → success → Home checklist for first item / optional payment & logo
- **Make a Sale** — always available when inventory exists; attaches to active Market Day when one is open; off-day sales save to Running Tab with optional name/notes
- **+ Pre-order** — required name/notes/complete date, Pay on pickup, global catalog, always Running Tab (even during a fair)
- **Sell flow** — menu **− / qty / +** steppers (**0** when not in cart), read-only cart (**Name(qty)** + **N items** total), payment (**Order Total**; Venmo/Zelle pay-to card when configured; amount-entry for Cash and Venmo/Zelle: **Amount Paid** → chips → change → **Keep change?**; payment-method selectors below; pay on pickup for preorders)
- **Celebration** — Edit this sale / Go to Dashboard; tap ✕ → Home
- **Events tab** — Active Market Day dashboard (sales, profit, Cash with tips breakdown, Venmo/Zelle; Today's Menu, sales list)
- **Settings tab** — business name/logo, change Pass Code, Zelle/Venmo payment info + optional QR uploads
- **Past Events** — closed days on Events empty state; detail view with export + Reopen
- **Start Market Day** — name + date form on Events (date defaults to today); also reachable from idle Home shortcut
- **Sales tab** — all-time sales across Market Days + Running Tab export
- **Preorders tab** — prep summary (what to make), overdue/upcoming sections sorted by complete date, printable export, open preorders; mark complete from admin edit
- **Inventory** — item CRUD, archive, delete (when no past sales)
- **Sale detail (admin)** — edit payment method, optional name/notes/complete date (preorders); **Cancel sale** (Return / Error) on completed sales; delete open preorders
- **Export** — closed Market Day + Running Tab date range (CSV with **Change kept**, cancel columns, + tips summary footer) + preorder printout (text) → share sheet
- **Parental gate** — 4-digit Pass Code (`expo-secure-store`); unlocked after setup; lock via header **Lock & go to Dashboard**
- **SQLite** — local-first on device; foreign keys on at init; crash-safe `sales` rebuilds with leftover-table recovery (see [ADR 0003](../docs/adr/0003-sqlite-fk-and-crash-safe-sales-rebuild.md))

## UI

**Playful Premium** brand direction: warm peach welcome surfaces, ivory working canvas, lavender accents, purple primary actions. Staff/POS layout still largely matches [../mocks/screens.html](../mocks/screens.html); onboarding is being redesigned page-by-page (Phase 1 = splash).

- **[HeroUI Native](https://heroui.com/)** + **Uniwind** (Tailwind-style `className` where convenient)
- **Fonts** — Playfair Display (onboarding/display), Fredoka (POS headings/prices), Nunito (body/labels); loaded via `expo-font` in `app/_layout.tsx`
- **Tokens** — `theme/tokens.ts` (palette, type scale, motion, radii, control states); `constants/theme.ts` + `constants/visual.ts` semantic aliases; `global.css` (HeroUI/Uniwind)
- **Brand art** — `assets/images/logo-app.png`, `logo-long.png`, `octo.png`, `octo-buddy.png`, `celebrate.png` (use real assets; do not approximate)
- **Layout helpers** — `components/Screen.tsx` (`Screen`, `ScreenHeader`, `SectionLabel`, `ItemCard`)
- **Reusable UI** — `components/ui/` (`Button`, `Card`, `Chip`, `Input`, …)

Staff screens use explicit `StyleSheet` + token imports so typography stays consistent; celebration and payment labels no longer rely on generic system bold.

## Project layout

```
app/              screens (expo-router)
components/       shared UI
constants/        theme colors, visual tokens, app font map
context/          cart state during checkout
lib/db/           schema + queries
__tests__/        domain + visual-polish tests
```

## Tests

```bash
npm test
```

Includes `visual-polish-test.ts` (fonts/radii/spacing) and `theme-tokens-test.ts` (Playful Premium palette + motion).

## Next build steps

- **Onboarding Phase 2** — Profile redesign + keyboard-avoidance (see [../NOTES.md](../NOTES.md))
- **009 HITL** — iPad visual pass with kid at the booth
- Item photos ([008](../scratch/issues/008-item-photos.md))
- App Store / TestFlight build ([010](../scratch/issues/010-app-store-submission.md))

## App Store path (later)

When ready for TestFlight / App Store:

1. Enroll in [Apple Developer Program](https://developer.apple.com/programs/enroll/) ($99/yr)
2. `npm install -g eas-cli && eas build --platform ios`
3. `eas submit --platform ios`

See [../docs/adr/0001-expo-local-first-stack.md](../docs/adr/0001-expo-local-first-stack.md) and [../PRD.md](../PRD.md).
