# DESIGN.md: the DRM's look, pinned

Direction: the merge proposed in `docs/ui-prototypes.md`; the founder's pick overrides this.
Read `~/.claude/design-preferences.md` first; this file is the project's answer to its last section.
Precedence on conflict: `UI-SPEC.md` (none yet) → this file → `~/.claude/design-preferences.md`.

## Direction

Named aesthetic: **Swiss / International skeleton, with editorial pull quotes and instrument-panel
glyphs.** In one line: a typographic poster of the facts, where the customer's own words are set in a
serif and every status is a shape, not a colour.

This product's single job on screen: **show the founder the verdict on their riskiest assumptions
first, then the evidence it rests on, with the AI's objection before the AI's number.**

Signature element, one per page (spend boldness here and nowhere else):
- Home: the **share bar per problem**, 56px tall across the text column, one slot per interview needed,
  with the counts as 96px numerals under it.
- Assumptions map: the **posture gauge**, a horizontal scale in five bands, Contradicted, Shaky, Untested,
  Weak signal, Strong signal, with the needle where the evidence puts it (with no evidence: at the centre).
- Interview page (and anywhere quotes are the content): the **pull quote**, Fraunces 300 at 24–28px with
  the behaviour type and interview ID as a margin note.
- Every other page: the page title row and black rules; nothing else competes.

What the merge takes from each prototype and what was decided where the proposal was silent:
1. Skeleton from C: stone background, 2px black rules between rows, 1px hairlines inside tables, no cards,
   no shadows, no rounded corners. The verdict at 64px / 800 (72 in the prototype; 64 keeps a two-line
   verdict above the fold next to the sidebar). The riskiest assumptions are a real table with the AI's
   objection column beside the status.
2. Quotes from A: wherever the customer's words appear, Fraunces 300, hanging opening quote, and the
   evidence type plus ID as a small note. Two faces (grotesk for structure, serif only for the customer's
   words) is the whole contrast system.
3. Gauge and glyphs from B: the gauge on the map and, smaller, under the verdict on the home page. Status
   glyphs everywhere status appears: hollow square = untested, half = shaky, ringed = weak signal,
   filled = strong signal, hatched = contradicted. The map stays light; B's geometry (quarter grid, axis labels inside the
   square) on C's 2px black axes.
4. One accent, interactive only. **C's blue**, not A's red: red next to "Contradicted" would start to
   mean two things, which the proposal warns against. Contradicted is hatched plus the word.
5. The sidebar stays (the proposal's "no sidebar" was written for a two-page prototype; the app has
   twenty routes and the brief keeps the collapse behaviour). It is restyled as a typographic column on
   the same stone, separated by a 2px rule, with no panel colour, so it reads as the first column of
   the grid rather than a navy chrome. The gauge needle is ink, not accent: it is a reading, not a control.

## Type

Display and UI: **Archivo** (variable, width 100), loaded from Google Fonts.
Quotes: **Fraunces** (variable, optical size on, weight 300, roman and italic), Google Fonts.
Mono: system mono (`ui-monospace, Menlo, Consolas`) for record IDs, commands and code only; never as a
display face, so it is not loaded as a webfont.
Fallbacks if the webfonts fail: Archivo → `"Helvetica Neue", Arial, sans-serif`; Fraunces → `Georgia,
"Iowan Old Style", serif`. The app must render with those.

Scale: **12 / 15 / 24 / 64** for the grotesk, plus **96** for the share-bar numerals and **28** for pull
quotes (24 in narrow columns, 17 in compact lists). Page titles sit at 48 (a second-level display size for
pages that have no verdict). Nothing in between.

Weights: Archivo **200 and 800**, plus **300 for running UI text at 15px and below** (200 is illegible at
form-field sizes on stone; this is the one stated exception to the two-weight rule). 200 is reserved for
the large numerals (48 and 96). Fraunces at 300 only. Section labels and column heads: 12px / 800 /
uppercase / 0.02em tracking. Verdict: 64px / 800 / −0.03em / line-height 0.98.

## Color

Dominant: stone `#eeeeea`, with a faint vertical gradient (`#f3f3ef` at the top to `#eeeeea` by 480px)
so the page has atmosphere without a pattern. Ink `#111111`. Secondary ink `#8c8c88`.
Lighter stone for input fields and sheet insets: `#f6f6f3`.

Accent: **`#1438d8` (blue)**, reserved for:
- in-text links and link-styled buttons,
- the primary action (`.btn.pri` fill; it inverts to stone-on-blue on hover),
- `:focus-visible` rings,
- the selected point's ring on the map and the selected row marker.
Never a background, never a tag, never a status, never a chart colour, never a rule.

Neutrals ramp: `#111111` ink · `#8c8c88` grey · `#c9c9c4` hairline-light · `#eeeeea` stone · `#f6f6f3`
inset · `#ffffff` only inside the map's grid square (so points read against it).

Every token carries a boundary:
- `--ink #111111`: text, 2px row rules, 1px table hairlines, filled glyphs, filled chips, primary nav.
- `--grey #8c8c88`: secondary text, captions, disabled text, the quarter-grid lines on the map, AI points.
- `--acc #1438d8`: the four uses listed above ONLY.
- `--stone`, `--inset`: surfaces. No other surface colours exist.
- Status is carried by shape and the word: `■` filled = strong signal / confirmed, `▣` ringed = weak signal, `◧` half = shaky,
  `□` hollow = untested / suggested, `▨` hatched = contradicted / rejected / not in transcript.
- Tiers are words. Hair on Fire is set in a filled chip, Incremental hatched, the rest outlined.
- There is no red, yellow, green, coral, teal, navy, sky or purple anywhere.

## Motion

The one orchestrated moment: the **gauge needle** slides from the centre to its reading when the home
page or the map loads (240ms, ease-out, `transform` only). It is the only thing that animates on load.

Everything else: crisp interaction feedback only.
- Every interactive element declares `hover`, `focus-visible`, `active` and `disabled`.
- Hover inverts (ink on stone ↔ stone on ink) or thickens an underline, instantly.
- `active` drops opacity to .7 over 150ms; map points scale 1.25 on hover over 150ms (`transform`).
- Transitions 150–250ms, ease-out, on `transform` and `opacity` only. No colour transitions, no fades on
  scroll, no bounce, no glow, no library.
- `prefers-reduced-motion`: the needle appears in place (opacity 150ms instead of the slide), hover scale
  is removed, the opacity feedback stays.

## Spacing and grid

8px base. Page gutters 48px (16px under 900px). Rows are separated by 2px rules with 24px above and
below; inside a row, related things sit 8px apart, unrelated 24px. Twelve columns, 24px gutters, on the
home page and insights; the label column spans 2 (1 under 1100px), the content 10. The map breaks the
grid: its viewport runs edge to edge under the tab strip, no gutter.

## What we are not doing

- No cards, tiles, chips with coloured fills, pills, shadows, rounded corners, glassmorphism or gradients
  on elements (the page background gradient is the one exception, and it is nearly invisible).
- No coloured status, tier or signal. If it has a meaning, it has a shape and a word.
- No icons, no emoji as iconography (the ✓ ✕ in confirm/reject buttons are text glyphs in the UI face).
- No Inter / Roboto / system-ui display face; no purple; no centred hero; no three-across cards.
- No second accent, no dark mode (the app is a document you read for minutes; the dark instrument panel
  was rejected for that reason).
- No motion on scroll, no staggered reveals, no needle on every page (only where the gauge is).
- No simplification of a layout because it is easier to build. If a page lands short of this file, it
  is listed as a difference in `docs/ui-rollout.md`, then fixed.
