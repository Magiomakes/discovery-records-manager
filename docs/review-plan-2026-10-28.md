# Plan from the founder's review of 2026-10-28

Source: 28 comments the founder left on the private review page (main at 73460a2, demo data).
Grouped by what they need: a straight fix, a decision, research, or a design pass first.

## A. Straight fixes (no research, no new design; one batch)

| # | Change | Comments | Notes |
|---|---|---|---|
| A1 | The posture gauge needle animates on every render (every click, every reload). Animate once per page load, then hold still. | "dial moves every time you reload", "style moves every time you move the page" | `.gauge .needle{animation:needle .24s}` replays because every render rebuilds the DOM. Keep the one deliberate moment on first paint, drop it after. |
| A2 | Pages fill the window. `.page{max-width:1280px}` caps every sheet; home, Interviews, Leaner Canvas, Value proposition and Problem statement all sit in a 1280px column with stone either side. | "not using the full screen space" ×4 | Fluid grid, columns that add up at wide widths rather than stretching one column. The phone layout stays as it is for now. |
| A3 | Thresholds (minimum interviews, strong-signal share) leave Settings. They become constants in the app and in the rules file. | "should not be adjustable" ×2 | Values come from B2 below; until then keep 5 and 50%. |
| A4 | The map legend lists statuses in the gauge's order. | "same order as the dial" | |
| A5 | One word for a point that is none of the named kinds. "Other bet" goes; the word is **assumption** everywhere (the method's word; "bet" and "hunch" disappear from the UI, the rules file and the demo). | "standardize the language" | Needs the founder's yes on "assumption" over "hunch". |
| A6 | Delete interview is findable. It exists at the bottom of the interview page's details, with a confirm, but the founder could not find it. Move it next to the interview's title row, keep the "are you sure" step. | "no way to delete interviews" | |
| A7 | Ledger check leaves the sidebar. The check keeps running (it feeds the warnings on pages) but has no page of its own. | "not needed right now" | |
| A8 | Quotes and Suggestions become one page, **Quotes**, with a filter: To be confirmed (default), Confirmed, Rejected. To be confirmed shows one decision at a time, with the transcript context, confirm / reject, and "next". | "same tab", "one at a time", "to be confirmed" | |
| A9 | Ask your AI becomes **How to use AI**: how to point Claude Code / Claude Desktop / Cursor at the repository folder, then the one-line asks ("Review interview INT-003", "Diagnose my snapshot") since the rules file already carries every prompt. The copy-paste prompts stay as a collapsed fallback for people with no folder-reading AI. | "should be called how to use AI" | |
| A10 | AI notes live in their sections. An interview page shows the transcript, the quotes pulled from it beside it, and under it the AI's review of how the interview went. The assumptions note sits with the map. The AI notes page goes. | "should be in the relevant sections" | |
| A11 | The coach goes. No coach name at setup, no Coach report page, no README rebuild, no "push before the coach meeting" story. SETUP.md loses step 3. The rules file loses "Prepare for a coach meeting". | "remove the coach entirely" | The founder's call; the README rebuild is the one thing other founders might miss, so it comes out cleanly rather than half. |
| A12 | The three sidebar groups (Snapshot of your business, Evidence, Insights) each get a page of their own: what the section is for, what each item in it does, how the AI helps there, what to expect from it. Clicking the group heading opens it. | "should be an actual page" ×3 | Short, plain, no marketing. |

## B. The scoring model (research first, then a decision)

| # | Change | Comments | Needs |
|---|---|---|---|
| B1 | Five statuses instead of four: Contradicted, Shaky, Untested, **Weak signal**, **Strong signal**. Today "Holding up" covers both. | "five segments" | A definition of weak vs strong that the app can compute and the rules file can state. Proposal to test against the reading in R1: Weak signal = the share clears the bar but on fewer than the minimum interviews, or clears it only with weak interviews (friends, leading, pitched, no recent instance); Strong signal = clears the bar on at least the minimum, clean. |
| B2 | Fixed thresholds "based in science and data". | "should not be adjustable" | Honest note: there is no study behind 5 interviews and 50%. SETUP.md already says they are coaching defaults, not from Darren Yee's posts. R1 reads the two posts for what they actually say about how many interviews and what counts as signal; the constants then cite that, and where the posts are silent the note says so. |
| B3 | Impact and confidence: a five-point scale centred on neutral (−2 … +2, in words: very bad, kind of bad, neutral, kind of fine, not an issue) instead of 1 to 5. Or drop typed numbers for the founder altogether: position on the canvas is the rating, the AI alone works in numbers. | "neutral in the middle", "maybe remove this mechanic" | A decision. Recommendation: drop the founder's numbers. The canvas position already is the rating; showing a 1–5 next to it is the clunky part. Axis labels become the five words. The AI keeps numeric impact and confidence and shows them on its side. Prototype both on the map before choosing. |

## C. The map as a whiteboard (design pass, then build)

| # | Change | Comments | Notes |
|---|---|---|---|
| C1 | Full-bleed canvas, no framed box: the whole main area is the board. Zoom in without limit; zoom out stops where the grid fills the window (so the limit follows screen size). | "feel like a whiteboard", "maximum zoom out based on screen size, infinite zoom in" | The grid, axes and shelf stay; the border and the stone surround go. |
| C2 | Points are dots, no permanent labels. Click opens the small card with the text; double-click opens the full edit panel. Founder's and AI's points clearly different (solid square vs dashed, already) with a filter: Mine / AI / All. | "just a dot", "filter mine vs AI" | The founder floated drag-with-modifier (cmd/ctrl-drag) so a plain click can't nudge a point. Whiteboard convention (FigJam, Miro, Jamboard) is: click selects, drag moves, double-click edits, with a few pixels of drag threshold so a click never moves anything. Recommend the convention with the threshold; offer modifier-drag as a setting only if it still feels wrong. |
| C3 | Keep the status words on points (Holding up, Shaky …), extended to the five of B1. | "I like that, let's keep that" | |

## D. Insights as assumption tiles (the big one; design pass first)

One pattern for all four pages, then what is specific to each.

**The pattern.** The page is a grid of tiles, one per assumption of that kind, each with its status (the five of B1) and the AI's priority. Click a tile: the assumption at the top; under it the evidence for and against, tallied, then every quote with its interview and type; then the part that is specific to the kind.

| # | Page | Specific part | Comments |
|---|---|---|---|
| D1 | Problem | Pain per problem: the tiers across confirmed interviews (the share bar), plus the weak-interview discount. | "tiles … hair on fire scale" |
| D2 | Solution | Jobs: what people are trying to do, with the quotes that show it, and what they did about it (workarounds, past behaviour). Where the evidence says the solution should differ from the founder's belief. | "customer jobs", "what the actual solution looks like" |
| D3 | Customers | Not assumption tiles. Segment tiles, the founder's ideal marked, and for each the AI's read of how much real pain that segment shows (from pain scores by `customerId`), so the question on the page is "is my ideal customer actually my ideal customer". Below: the persona the AI drafts from the confirmed quotes, and leads. | "segments, ideal marked, ranked by signal", "persona from the data", "find leads" |
| D4 | Alternatives and competition | Tiles for alternatives and competitors; the AI proposes alternatives and competitors it finds (as Candidate records the founder accepts or dismisses) and refreshes that search every time Diagnose runs. | "AI should be suggesting who my competitors are, searching every diagnostic" |

D4's search is an AI-side task, not app code: a new task in the rules file ("Scan for alternatives and competitors") that writes Candidate alternatives with the URL it opened and the date, and a Candidate record type for them. The app shows and accepts them like leads.

## Research before building

- **R1, before B and D1.** Read Darren Yee's "The Discovery Ladder" and "How to Actually Talk to Customers" for: how many interviews before a problem counts as tested; what share or pattern he treats as signal; whether he distinguishes a weak and a strong signal; what he says about segments and the ideal customer. Write the findings into `docs/method-thresholds.md` with the quotes, and set the constants from it. Where the posts are silent, the constants stay coaching defaults and the doc says so.
- **Nothing else needs the web.** Whiteboard interaction conventions are settled (click selects, drag moves with a threshold, double-click edits, wheel or pinch zooms, space-drag or right-drag pans). The persona and leads tasks already exist in the rules file. Competitor search is a rules-file task for the founder's AI, which can browse; the app cannot and should not.

## Decisions the founder makes

1. A5: "assumption" as the one word, or "hunch".
2. A11: confirm the coach comes out entirely, including the README report other founders' coaches read today.
3. B3: drop the founder's typed impact and confidence (canvas position only), or keep them as the five words.
4. C2: plain drag with a threshold, or drag only with a modifier key.
5. D3: Customers as a segment page with persona and leads, not assumption tiles.

## Order

1. Batch A (one or two sittings; each item small, together they change most pages). Republish the review page after it.
2. R1, then B as one change: the five statuses, the constants, the map's axis words. The rules file, the check and the demo data move with it.
3. C as a prototype on the review page first (two variants of the point interaction), then build.
4. D as a prototype of the tile → detail pattern on Problem first, then the other three.

## What would make this wrong

If the founder's five levels are meant as a per-interview reading rather than a per-assumption one, B1 is the wrong shape and the gauge, not the status, is what gets five segments. If R1 finds the method prescribes something other than a share of interviews (for example, a count of Hair on Fire interviews), B2's constants change form, not just value.
