# ZigZag notes

Researched 2026-10-27. Nothing in the app was changed.

## 1. What ZigZag is, and how sure I am

**Most likely candidate (moderate-to-high confidence it is the one the founder means): ZigZag, "AI-Powered Startup Journey Platform" at gozigzag.com.** A web tool where a founder describes an idea and the AI drafts a Lean Canvas, validation hypotheses, a customer survey, a website, MVP requirements and an investor data room.

What I could not confirm: any link between ZigZag and Mount Royal University, Ideas Lab, LaunchPad or Calgary. Two searches for those pairings found nothing. So "ZigZag is what the program used" is an assumption. The founder should check which program handout or site named it.

Other candidates found, both unlikely: a London accelerator/investor also called Zigzag (a PitchBook profile and LinkedIn company page appeared in search results; I did not open either, and it is probably the same company behind gozigzag.com, but I haven't verified that), and an unrelated puppy-coaching business named ZigZag. I found no separate entrepreneurship-course toolkit with that name. I did not identify "the other toolset".

**URLs I actually opened**
- https://www.gozigzag.com/ (ZigZag's own page; source for everything in section 2)
- https://leanspark.ai/compare/leanspark-vs-zigzag/ and https://leanspark.ai/compare/leanspark-vs-zigzag (a competitor's comparison page; treat its criticisms as one-sided)
- https://startupily.com/the-power-of-ai-human-collaboration-transforming-the-startup-ecosystem/ (third-party article; it says ZigZag also offers mentors and talks, and names no university partners)

## 2. ZigZag's tools, as listed on gozigzag.com

**Refine**
- Lean Canvas, with a Consistency Checker (AI flags inconsistencies between sections)
- Validation: Critical Hypotheses, Customer Survey, Tracking and Analysis of Customer Responses, Pivot Recommender (AI pivot-risk analysis)
- Brand: Brand Elements, Startup Name Suggestions, logos and visual assets
- Outreach: Elevator Pitches, One-Pagers

**Build**
- Website; MVP Requirements; MVP Building (AI coding agent)
- Investor Data Room, including an AI Pitch Deck Generator
- Outreach: Outreach Emails

The page names a Customer Survey but does not describe customer interviews. Pricing at the time of reading: Free, Starter $8/month, Builder $16/month; half-price Starter for students with an edu email. Note the competitor page claims it also has a Business Model Canvas and legal templates; ZigZag's own page lists neither.

## 3. Mapping to DRM

| ZigZag tool | DRM page or record |
|---|---|
| Lean Canvas | Compass 01 Leaner Canvas |
| Consistency Checker | Partly: Ledger check validates records, not whether canvas, value proposition and problem statement agree. Not covered for the Compass sheets |
| Critical Hypotheses | Compass 04 Assumptions Map (`drm/assumptions/`) |
| Customer Survey | Not covered (DRM is interview-based) |
| Tracking and analysis of responses | Insights pages, pain scores, Coach report |
| Pivot Recommender | Not covered; proposed in REVIEW-AND-PLAN section 3 |
| Brand, Website, MVP Requirements, MVP Building | Not covered. MVP scope is only parked on the Solution insight |
| Elevator Pitches, One-Pagers | Closest: Compass 02 Value Proposition and the Coach report |
| Investor Data Room, Pitch Deck | Not covered |
| Outreach Emails | Not covered; `firstQuestion()` opener and Leads List are nearest |
| "Zig" AI assistant | Claude Code tasks in CLAUDE.md |

## 4. Things DRM could borrow (your call)

1. **A canvas consistency check** (Compass sheets 01 to 03, surfaced in Ledger check). Warn when the value proposition names a customer or problem that is not on the canvas, or the problem statement has no matching problem point. Cheap, rule-based, no AI needed.
2. **Pivot suggestions**, as already planned in section 3 of the plan, but gated on evidence (ZigZag's version, as listed, has no stated evidence gate).
3. **Draft outreach messages on the Leads List (05).** An editable opener per lead with a copy button, built from the problem statement. This extends the plan's item 2d.
4. **A one-page export from the Coach report** (an elevator-pitch style summary built from the value proposition plus only confirmed quotes). Useful for applications to accelerators, which is where ZigZag says it gets users.
5. **A pre-interview survey as a lead filter**, only if you want it: a short screener on the Leads List, with answers stored as `Opinion or future intent` so they cannot raise a pain score. I would treat this as optional; it pulls DRM toward stated intent, which the two rules rank lowest.

## 5. What DRM does that ZigZag, as described, does not

- **Evidence discipline.** Verbatim quotes, one per file, typed by behavior, each cited by pain scores that `tools/check.js` validates. ZigZag's pages describe survey responses being tracked, with no mention of exact-quote evidence.
- **Founder confirms, AI suggests.** Candidate versus Confirmed status. ZigZag's pitch is that the AI "does the rest".
- **Sceptical AI.** Ratings carry the case against and the evidence they rest on; guesses are labelled. The competitor page characterises ZigZag's AI as filling templates, not challenging assumptions. That is a rival's claim; I could not verify it from ZigZag's own page.
- **Interview hygiene.** Leading questions, pitching, friends and family, recent-instance checks that discount weak interviews.
- **Data lives in the founder's own folder or repo**, readable by any assistant, not inside a hosted account.

## Caveat

ZigZag's page is marketing copy and I did not log in or try the product, so the tool list shows what it claims, not how well it works.
