# UI rollout: the merged system through every page

What was done: the merge proposed at the end of `docs/ui-prototypes.md` (C's skeleton, A's quotes, B's
gauge and glyphs, one accent, one signature per page) was pinned in `DESIGN.md` and then rolled through
`index.html`: the palette and type variables, the fonts, the sidebar, sheets, boxes, tiles, chips, quote
cards, notices, buttons, forms, the map (points, labels, legend, selected-point card, You and AI panels),
the welcome and setup screens. Every `data-act`, id, route and function name is unchanged; behaviour is
unchanged. `sw.js` cache bumped to `drm-shell-v2`; the manifest's theme colours follow the new palette.

New helpers (additions, no renames): `posture()`, `postureGauge()`, `glyphCls`, `statusWord()`,
`betsTable()`, `shareBar()`. `pointTile()` and `statusColor` are kept but no longer used by any page.

How it was looked at: a static server on port 8793 serving this worktree; headless Chrome at 1440×900
with a scratch profile and a cache-busting query for the desktop captures; the desktop app's browser
pane at a true 375×812 for the phone captures (headless Chrome enforces a minimum window width, so its
375px captures lay out wider than they are cropped and were discarded). Console checked on every page.

## Pass 1: differences between the first captures and DESIGN.md

Enumerated from the first 1440×900 captures of home, `#/compass/map/A-01`, `#/compass/canvas`,
`#/start`, `#/interviews/INT-001`, `#/review`, `#/insights/problem`, `#/insights/customers`, `#/ask`,
`#/settings`, the welcome page, and the phone captures of home, the map and an interview.

1. **Verdict at 48px, not 64.** `.sheet h1` (specificity 0,1,1) outranked `.verdict` (0,1,0), so the
   verdict rendered at the page-title size on every page and the phone override never applied. Fixed:
   the verdict rules are `h1.verdict`.
2. **Gauge labels ran together** ("CONTRADICTEDSHAKYUNTESTEDHOLDING UP"): the status-glyph class `.gl`
   collided with the gauge's label row `.gl`, which inherited a 10px box. Fixed: glyphs are `.gy`.
3. **Verdict wrapped to five lines** at 1440 because of a `max-width:16ch`. Fixed: no max-width; it
   fills the 9-column verdict column (three to four lines).
4. **Facts numerals misaligned** when a label wrapped ("Confirmed quotes" on two lines pushed its
   numeral down). Fixed: labels have a two-line minimum height and bottom-align.
5. **Map legend hidden** under the You panel and the selected-point card (it sat at the top-left; this
   was true of the old UI too). Fixed: legend at the bottom-left; the canvas hint moves to the top centre
   and is hidden while any overlay is open (`.vp:has(.ov) .hint2`).
6. **Shelf label collided** with the first shelved point's label box ("Not r[box]"). Fixed: the label sits
   at the top edge of the shelf.
7. **Phone: map tab strip spilled** into three ragged rows (tabs, counts and buttons fighting for 375px).
   Fixed: under 900px the strip wraps, the buttons row comes first at full width, the tabs scroll
   horizontally below it.
8. **Phone: the map band's gauge** is hidden under 1100px (the verdict stays). A deliberate cut: at 343px
   the four-word scale cannot be read, and the home page carries the same reading.
9. **Sidebar group label** "Snapshot of your business" wrapped at 220px (the review doc's complaint).
   Fixed: the sidebar is 236px and the label tracking is 0.04em; it still wraps to two lines at that
   width, which is acceptable for a group heading but not ideal; see "still open".
10. **Welcome page captured blank** in headless Chrome: the page waits on IndexedDB for a saved folder
    handle before rendering, and a virtual-time budget never lets that resolve. Captured with a plain
    load timeout instead; the page itself was fine in the browser pane.
11. **Gauge readout** on the map wrapped to two lines at 1440. Shortened to one.
12. **The capture script** opened `#/map` (not a route) for the phone map, so the "map" capture was the
    home page. Process error, not a design one; fixed in the script.

Nothing in the list above was a case of simplifying the design because it was easier; items 8 and 9 are
the two places where the result is short of the intent, and they are listed under "still open".

## Pass 2: what the second captures show

- Home: the verdict is the first and largest thing (64px / 800, four lines at 1440 next to the sidebar);
  the posture gauge sits under it; the four facts stack in the right three columns; Next is a ruled line
  with the one blue button; the share bar for PR-01 is the signature (one black slot, four dashed, 96px
  numerals "1 Hair on Fire" and "4 still to interview"); then the riskiest-assumptions table with the AI
  objection column before the AI's numbers; then the tier bar and the getting-started checklist.
- Map: tab strip with glyph counts; a band with the verdict at 24px and the full gauge (needle just left
  of centre, "Posture −0.12"); white grid square with quarter lines and 2px axes inside a stone canvas;
  square points (hollow / half / filled / hatched), dashed grey AI points with ties; axis labels inside
  the square at the corners; selected-point card with status word, the You panel (solid rule) and the AI
  panel (dashed rule) that leads with "Based on 2 confirmed quotes", then "The case against", then the
  bars. Legend at the bottom-left with the same glyphs.
- Canvas, Start, Value proposition, Problem statement: ruled columns, uppercase labels, Fraunces for the
  founder's lines, ideal customer marked by a 3px ink bar and a filled chip.
- Interview: 48px title, the hygiene chips, the transcript with ink underlines for confirmed quotes and
  grey for suggested, and the pull quotes at 24px Fraunces with the evidence type set as an uppercase
  margin note. Confirm is a solid square button, reject a dashed one.
- Suggestions, Quotes, Problem: same quote treatment; tier buttons invert when selected; notices are
  ruled lines (hatched rule for "not in transcript"); the transcript drawer is stone with a 2px ink edge.
- Insights: four glyph counts on hairlines, the two belief/test columns, the bets table, pivots, and on
  the Problem page the share bars.
- Ask, Notes, Settings, Help: ruled rows, mono for commands, inset fields with a 1px ink border and a
  blue focus ring.
- Welcome: left-aligned 64px title, Fraunces 28px sub, blue primary, ruled sections; no centred hero.
- Phone (375): no horizontal scroll on home, the map or an interview (scrollWidth = 375 on each); the
  verdict at 34px; the facts in two columns; the share bar at 40px with 48px numerals; tables scroll
  inside their row; the map's three overlays stack (card on top, You and AI panels at the bottom).

Console: no errors on any demo page. On the non-demo welcome page the pane's embedded browser logs
"An unknown error occurred when fetching the script" from `navigator.serviceWorker.register("./sw.js")`;
the call is wrapped in `.catch(() => {})`, is pre-existing, and does not occur in the demo, which never
registers the worker.

Syntax: `node --check` on the extracted script passes. `node tools/check.js`: 0 problem(s), 0 warning(s).

## Fixed after the merge (2026-10-28)

- The selected point's three panels are no longer overlays on the canvas. "What the evidence says" is a
  strip under the posture band; You and Your AI are the first and last columns of a three-column stage
  with the map between them, so no label or axis caption sits under a panel. The map re-fits when the
  stage changes width (select, close) unless it had been zoomed by hand.
- The point label at the right edge ("Free expense apps…") was hidden under the AI panel; with the panel
  in its own column it is in the clear.
- The gauge was hidden under 1100px; it now stacks under the verdict at full width (a shorter scale
  under 900px). It is the map's signature element and should not disappear on a laptop.
- The sidebar group headings follow DESIGN.md's 0.02em tracking (they were at 0.04em) and don't wrap;
  "Snapshot of your business" fits on one line at 236px.
- Under 1000px with a point selected, the map page scrolls as a document: band, strip, the map at a fixed
  height (440px or 55vh), then You and Your AI side by side. Before, the two panels took their 40vh and
  the map itself collapsed to a sliver.
- The tab strip at 1440 wrapped its right-hand row (⤢ fell to a second line) and clipped "05 Leads List";
  the row no longer wraps and the tabs tighten under 1500px.
- The map legend wraps before it runs under the −/+/Fit buttons.

## Still open (not cut for convenience; listed so they are not forgotten)

- On a phone the world labels (axis captions, point labels) scale with 1/zoom, so at the small fit zoom
  of a 375px map they crowd each other; the map was designed for a desk and the proposal did not cover
  phone widths.
- Archivo 300 is used for running UI text at 15px and below (DESIGN.md names this as the one stated
  exception to the two-weight rule). If the founder prefers the stricter 200/800, the body weight is a
  single variable (`--w`).

## Captures

All in `docs/ui-rollout/`: `home.png`, `compass-map-A-01.png`, `compass-canvas.png`, `start.png`,
`interviews-INT-001.png`, `review.png`, `insights-problem.png`, `insights-customers.png`, `ask.png`,
`settings.png`, `welcome.png` (1440×900), and `mobile-home.png`, `mobile-compass-map-A-01.png`,
`mobile-interviews-INT-001.png` (375×812, from the browser pane).
