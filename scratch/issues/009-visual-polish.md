# 009 — Visual polish (fonts + OctoVendo brand)

**Type:** HITL  
**Status:** open (code shipped — iPad sign-off pending)  
**Blocked by:** None

## What shipped

Match booth personality + logo palette (post-rebrand; superseded earlier purple mock `#F3E9FF` screen).

### Earlier polish
- **`constants/visual.ts`** — Fredoka/Nunito, radii, spacing, touch targets
- **`constants/app-fonts.ts`** + `app/_layout.tsx` registration
- **`__tests__/visual-polish-test.ts`**
- Screens: Home, sell (menu steppers, cart, checkout), payment, celebration, owner tabs, `Screen`, `MarketDaySummaryCard`
- Touch targets ≥ 44×44 where needed

### Playful Premium — Phase 1 (brand foundation + splash)
- **`theme/tokens.ts`** — centralized peach / ivory / lavender / purple palette, type scale, motion, radii, control states
- **Playfair Display** for onboarding display typography; Fredoka + Nunito retained for POS chrome
- **`SetupSplash`** — peach full-screen, `logo-app`, tagline “Simple tools for bigger days.”, indeterminate purple loader, Reanimated entrance, reduced-motion support
- Real init progress only (no fabricated mid-progress or artificial startup delay)
- Official art retained: `logo-app`, `logo-long`, `octo`, `octo-buddy`, `celebrate`
- Profile / Passcode / Success layouts **not** redesigned yet (Phase 2+)
- Keyboard-cover bug on Profile documented in `NOTES.md` for Phase 2

## Acceptance criteria

- [x] Fredoka + Nunito loaded consistently
- [x] Playful Premium tokens + Playfair Display registered
- [x] Premium splash matches peach/lavender/purple direction
- [x] Staff + owner screens follow brand tokens (layout redesign deferred)
- [x] Touch targets ok for a 12-year-old
- [ ] Dinna/kid sign-off on iPad visual review
- [ ] Phase 2 Profile + keyboard fix
- [ ] Phase 3+ Passcode / Success / Home checklist motion

## Blocked by

None
