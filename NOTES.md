# Teaching Notes

- User is a frontend web developer — map new concepts to web equivalents (localStorage, blob download, mailto).
- Wants kid-friendly App Store app with on-device data.
- Asked specifically: how device memory and email work when sending daily/weekly/monthly sheets.
- Clarify later: does "send to their phone" mean parent receives email, or kid saves to Files on same device?
- Market deadline: ~3 weeks (target live by ~Sep 18, 2026). Submit for review by Sep 8–10.
- "Paygate" means post-trial paywall / Pro unlock — not parental gate. Parental gates are Pass Code (separate).
- Pro upsell context: v2 cross-device sync; free tier should remain usable (soft paywall).

## Onboarding redesign — Playful Premium

- **Phase 1 (done):** brand tokens in `market-day/theme/tokens.ts` + premium splash only.
- **Palette:** peach welcome `#F8DED7`, ivory working `#FFFAF7`, lavender `#D8D3ED`, purple primary `#7969A5` / pressed `#62528F`.
- **Type:** Playfair Display (display/onboarding), Fredoka (POS headings), Nunito (UI).
- **Next:** Phase 2 Profile redesign + keyboard fix; then Passcode, Success, Home checklist motion. Wait for approval between pages.

## Phase 2 — Onboarding keyboard (documented in Phase 1)

**Bug:** Profile onboarding inputs can be covered by the soft keyboard.

**Current implementation (`ProfileSetupCard`):**
- `SafeAreaView` + centered `BrandCard` form — **no** `KeyboardAvoidingView`, **no** `ScrollView`, **no** keyboard-aware library.
- Fields use `returnKeyType="next"` / `"done"` and focus chaining for business → first name; last name submits Continue.
- First-name field has `returnKeyType="next"` but **no** `onSubmitEditing` to focus last name.
- Shared `FloatingLabelInput` is a plain `TextInput` wrapper (no scroll-into-view).

**Elsewhere in the app:**
- `PassCodeSheet` already uses `KeyboardAvoidingView` (`padding` on iOS, `height` on Android) + safe-area offset — useful reference, but it is a centered modal, not a full-screen form.
- Several grown-up screens use `ScrollView` with `keyboardShouldPersistTaps="handled"` without `KeyboardAvoidingView`.
- No `react-native-keyboard-aware-scroll-view` / `keyboard-controller` dependency today.

**Recommended Phase 2 approach (to validate on small iPhones + Android):**
1. Wrap the Profile form in `ScrollView` (`keyboardShouldPersistTaps="handled"`, `contentContainerStyle` with bottom padding for the CTA).
2. Outer `KeyboardAvoidingView` with platform behavior (`padding` iOS; test `padding` vs `height` on Android — do not assume one works).
3. On focus, `scrollTo` / `measureInWindow` the focused field so the last input and Continue stay visible.
4. Complete Next/Done chain across all three fields; keep safe-area insets + dynamic type (avoid fixed heights that clip).
5. Prefer composing RN primitives first; only add a keyboard library if platform testing shows gaps.

Do not ship Profile keyboard fixes until Phase 2 Profile redesign.
