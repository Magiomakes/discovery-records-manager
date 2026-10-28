# DRM review and improvement plan

Written 2026-10-27 after reading the whole repository and clicking through the demo at 1440×900. Nothing in the app was changed.

The goal, in your words: a founder runs a diagnostic of their idea, sees their assumptions clearly, prioritises what to learn, gets insights that are honest rather than agreeable, sees pivot points when the evidence turns, and gets real customer-discovery leads. The app's bones already do most of this. What's missing is (1) a built-in lean toward "prove me wrong", (2) a real leads pipeline, (3) a UI with a point of view, and (4) housekeeping in this checkout.

---

## 0. Housekeeping before anything else

- `README.md` at the repo root has been overwritten by the app with a "Shapesynth" coach report. This checkout pushes to the **public template** repo, so committing it would replace the template's front page. Run `git checkout README.md`.
- There are two ledgers: `drm/` (test data: problem "test", segment "Test") and `drm/drm/` (your real starting data: two retopology problems, three artist segments). The app was pointed at `drm/` once by mistake. Decide which is real, move it to `drm/`, delete the other.
- Your own venture data shouldn't live in the template repo at all. Make a private copy with "Use this template" (as SETUP.md tells founders to) and work there; keep this repo for the app.

---

## 1. The AI leans toward agreeing. Make it lean the other way, slightly.

### What's biased today

I read every prompt the app and the rules file hand to the AI (`rubricPrompt` in `index.html:614`, the seven tasks in `CLAUDE.md`, the `.claude/commands/`). The pain-scoring rules are already good: "classify by what they did", "when unsure choose the lower tier", "no recent instance caps at Nice to Have". That's the right instinct. But around them, the prompts only ever ask for signal:

| Where | What it asks | The lean |
|---|---|---|
| `rubricPrompt` Part 2 | "Pull out every quote that **shows the problem**, what they do about it, how often, what it costs, or how strongly they feel" | Only confirming quotes are extracted. "It's not a big deal" has no home: no evidence type and no stance field. |
| `rubricPrompt` Part 4, and `CLAUDE.md` review task step 5 | "which problem looks **strongest** so far and why" | Never asks which looks weakest, or whether the interview should count at all. |
| `CLAUDE.md` rank-assumptions | "Decide `aiConfidence`… with no evidence, confidence should sit at 1 or 2" | Good. But the reason is free text; nothing forces "here is the case against". |
| `CLAUDE.md` where-to-look | Find more of the right people | Never asks which segments the interviews have *not* reached (sampling bias). |
| Happy ears check | Exactly the right check | …but it's a separate task the founder has to remember to run. The correction has to be inside every task, not a chore on the side. |
| App verdicts (`compassReadout`, `index.html:1077`) | "Your three riskiest assumptions are holding up. Keep testing the next ones." | "Holding up" is computed from the share of confirmed Hair-on-Fire/Incremental scores, with no discount for interviews that came from friends, had leading questions, or pitched. Five leading interviews with friends can produce "holding up". |

### The principle: the AI argues the null hypothesis

Your scale: far left is "no", far right is "yes", and the AI should sit just left of centre so the founder has to push back to move it. Concretely:

1. **Default confidence is 2 of 5, not 3.** An assumption with no behavioural evidence starts "likely wrong" and has to earn its way up. (Today the rules say "1 or 2 with no evidence" but don't define the prior for weak evidence; make it explicit: opinion-only evidence never moves confidence above 2.)
2. **Every rating carries a case against.** New required field on assumptions: `aiAgainst` (one sentence: the strongest evidence-based reason this is wrong) and `aiWouldChange` (what evidence would move the rating). `tools/check.js` warns when either is empty on a rated assumption; the app shows them in the AI panel next to the rating, so the founder reads the objection before the number.
3. **Evidence gets a stance.** Add `stance: "for" | "against"` to evidence records (default `for`, so existing files stay valid). The review prompt asks for quotes that show the problem *and* quotes that show it's absent, mild, or already solved. A pain score that cites an `against` quote while claiming Hair on Fire gets a check.js warning. The Problem insight shows for/against counts side by side.
4. **Every review ends with "why this interview might not count."** Replace "which problem looks strongest" with: strongest, weakest, and the single strongest reason to discount the whole interview (source, leading questions, no recent instance, pitched). The founder then decides.
5. **The app discounts weak interviews in the status maths.** `assumptionStatus` keeps counting, but the `why` string says "3 of 5 show pain, 2 of those are friends or had leading questions" and the status drops to Shaky when discounted interviews are what carry it. This is the one change that stops the app itself from being happy-eared.
6. **A standing "poke holes" task.** New task in `CLAUDE.md` and `.claude/commands/poke-holes.md`: for the three riskiest assumptions, write the strongest case each is wrong using only confirmed evidence, name the pivot each implies (see §3), and say what one interview question would settle it. It writes to `drm/notes/`. The home page's "Next:" line suggests running it after every two interviews.
7. **Words the AI may not use** in notes: validated, confirmed (except the record status), proven, strong signal. check.js can grep notes for them and warn.

Nothing above makes the AI contrarian. A Hair on Fire interview still scores Hair on Fire. It just means the AI never hands over a number without the objection attached, and the founder has to dismiss the objection deliberately.

**Files:** `CLAUDE.md`/`AGENTS.md` (new rule 3, task changes), `index.html` (`rubricPrompt`, `parseRubric` for the stance column, `aiPanel`, `assumptionStatus`, `compassReadout`), `tools/check.js`, `.claude/commands/`. About a day of work, and it's the cheapest, highest-leverage change on this list.

---

## 2. Lead finding: turn it from advice into a measured channel

This is the part you called the biggest value proposition, and it's the thinnest part of the app today. What exists: a Leads List sheet the founder types into (`compass.leads`, read-only to the AI), `drm/places/` records the AI can propose, and a "where to look" task that may search the web. What's missing is the loop that makes it good.

### 2a. The AI proposes people, not just places

New record `drm/leads/LD-01.json`, Candidate: `{name or handle, role, segmentId, placeId, url, howFound, why, evidenceIds, opener, status}`. The founder accepts into the Leads List or dismisses, like assumptions. Rules: a URL only if the AI opened it; no invented names; `why` names the quote or interview the lead resembles, or says "guess from the segment description" and the app stamps it.

### 2b. A research task with teeth

New task **Research a segment**: given a segment from the compass, produce `drm/notes/YYYY-MM-DD-research-<segment>.md`: who these people are, what they already use, where they gather, what they call the problem in their own words, and the three communities worth joining this week. Every claim links to a page the AI actually opened, dated; anything else is labelled a guess. This is the "research for people" ability you asked for, done inside the evidence discipline the ledger already has.

### 2c. Close the loop: which places produce real pain

Add `placeId` to interviews (where this person came from). The Customers insight then shows **pain yield per place**: of interviews from each place, what share scored Hair on Fire or Incremental. After ten interviews the founder knows which channel finds the right people, which is worth more than any list. The where-to-look task reads this and recommends more of what's working and fewer of the places that produce Nice-to-Haves.

### 2d. Openers per place

`firstQuestion()` already builds "Have you experienced [context] / [complication]?" from the problem statement. Attach a one-line opener to each place and lead, editable, with a copy button. Small, but it's the moment a founder actually uses the tool.

**Files:** new `drm/leads/` dir in `DIRS`, interview `placeId`, `leadsSheet`, `insightsView("customers")`, two new tasks in `CLAUDE.md`, check.js rules. Two to three days.

---

## 3. Pivot points, evidence-gated

A pivot suggestion with no evidence behind it is just the AI having opinions, so gate it: the AI may only propose a pivot from an assumption whose status is **Contradicted** or **Shaky** with at least N confirmed scores. Otherwise it says "no pivot signal yet, N interviews short", which is itself useful.

New record `drm/pivots/PV-01.json`, Candidate: `{triggerAssumptionIds, kind, text, evidenceIds, status}` where `kind` is one of the classic moves: zoom-in (one feature becomes the product), customer-segment, problem (same customer, different pain), channel, value-capture, platform. Each must cite the quotes that point to it.

In the app: a contradicted point on the map gets a small marker; the Insights page for that area gets an "If this breaks" box listing the candidate pivots; the home page's verdict line mentions it. The "poke holes" task from §1 writes these.

**Files:** `drm/pivots/`, `mapView` marker, `insightsView` box, `CLAUDE.md` task, check.js. One to two days, after §1.

---

## 4. The diagnostic: get the snapshot down in one sitting

The Compass sheets are the diagnostic, but a new founder meets them as five separate forms. Two changes:

- **A guided first sitting.** From the welcome screen: one scrolling page that asks the canvas questions in order, in plain words ("Who has this problem? Who has it worst?"), and writes the compass as it goes. Same records, one flow. The "Getting started" checklist on the home page then becomes progress through the sitting.
- **Rename "Rank the riskiest assumptions" to "Diagnose my snapshot"** in the UI, and widen it: besides rating, it lists what's stated but untestable, what's implicit but not on the map (a buyer, a channel, a switching cost; the task already proposes these), and the two interviews to run first. Same task, framed as the diagnostic you described.

---

## 5. UI: what's wrong and three directions

### What I saw

- Every page has the same rhythm: a row of four stat tiles (mostly "0"), then two bordered boxes with coral tabs and uppercase headings, then a list. It reads as a printed worksheet from a program binder (the "IDEAS LAB / LaunchPad" wordmark on every sheet reinforces that). Consistent, but flat: nothing on screen is the thing to look at.
- Type is the system sans at 12.5–15px with a 30px heading; the serif appears only in tiny italic numerals and quotes. Roles don't contrast, sizes step by 1.5×, and the result is dense and small. The sidebar group label "SNAPSHOT OF YOUR BUSINESS" wraps at 236px.
- The five-colour program palette (navy, teal, coral, sky, yellow) is spread evenly: coral is a decorative tab, an alert, a focus ring, a badge. No colour means one thing.
- The map is the best screen and the only one with a signature (the bold 2×2). Even there, labels overlap at the top-left and the AI's dashed points are hard to read.
- Most important: the app computes a verdict (`compassReadout`: contradicted / shaky / untested / holding up, and the next step) and then puts it in a box halfway down the home page. The founder should see that sentence first, large, on every visit.

### Three divergent directions (same content, same ban list)

I'd prototype the home page and the map in each, side by side, then merge the best parts rather than pick one. Choosing is yours.

**A. Field notebook (editorial).** Point of view: this is a lab notebook where the customer's words are the hero. Display serif with real weight contrast (e.g. Fraunces 300/800) over a quiet humanist sans for UI; warm off-white paper, one accent (a signal red) reserved for the primary action and "contradicted". The verdict sentence is the masthead of every page, set at 40px+. Evidence quotes are typeset as pull quotes with the behaviour type as a margin note; tiles disappear, counts become a single sentence. Signature: the quote.

**B. Instrument panel (technical).** Point of view: a risk instrument you read at a glance. Mono for every number and ID (JetBrains Mono), a geometric sans for labels; dark desk, light paper sheets; the assumptions map *is* the home page, with a single horizontal "posture" gauge above it whose needle sits where the evidence puts it: and with no evidence it sits just left of centre, literally your "slightly on the left". Stat tiles become a dense readout strip. Signature: the gauge.

**C. Swiss / International.** Point of view: strict grid, black rules, no cards at all. Heavy grotesk (Archivo 200/800) at 3× size jumps, a 12-column grid that the map breaks across. Evidence and scores live in real tables with giant tier numerals and a share bar; one accent only on interactive elements. Signature: the share bar per problem, large.

Shared by all three, regardless of the pick: the verdict first; one accent with a stated boundary; the AI's objection shown before its number; a `DESIGN.md` in the repo pinning the choice so future changes don't drift back to the average.

**Process:** build the three as toggleable variants on one route (the `prototype` skill does exactly this), screenshot them, write down the differences, merge, then roll the merged system through the remaining pages. Three to five days for the merge and rollout; the prototypes are a day.

---

## 6. Hosting and "a true app" (later, as you said)

Keep this after §1–§3; it doesn't change what the tool knows.

1. **Now, cheap:** make the GitHub Pages site an installable PWA (manifest + service worker). It gets a dock icon and opens full-screen; the local-folder model stays. Half a day.
2. **Next:** a hosted web app that signs in with GitHub and reads/writes the founder's private repo through the API. Removes the Chrome/Edge folder picker and works on any browser, but the AI-in-the-folder flow then needs the AI to clone the repo, so the "paste the reply" fallback becomes the main path unless the app calls an LLM itself (which brings keys, cost and the bias problem back inside your walls). Decide this one deliberately.
3. **Desktop (Tauri)** only if (2) proves people want it.

---

## 7. Sequence

| Phase | What | Why this order |
|---|---|---|
| 0 | Housekeeping (§0) | Ten minutes; stops a bad commit |
| 1 | Bias fixes (§1) | Cheapest, touches the core promise, no design decision needed |
| 2 | Leads pipeline (§2) | Your stated biggest value; builds on §1's stance field |
| 3 | Pivot points (§3) | Needs §1's "poke holes" task |
| 4 | UI prototypes → merge → rollout (§5) | Can run in parallel with 1–3 as its own session since it starts on a prototype route; needs your pick in the middle |
| 5 | Guided diagnostic (§4) | Easier once the design system exists |
| 6 | PWA, then hosting decision (§6) | Last |

Open question I couldn't resolve from the transcript of your message: "based off of zigzag and another tool set" — I don't know what ZigZag refers to here (a method, a product, a book?). Tell me and I'll fold it into §4 or §5.
