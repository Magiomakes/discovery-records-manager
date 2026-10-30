# Discovery Records Manager: instructions for AI assistants

This folder is a founder's customer-discovery evidence ledger. The founder opens it in the DRM web app and also in you (Claude Code, Claude Desktop, Cursor, or another assistant that can read and write files here). You review the evidence and suggest; the founder decides.

## How to work here (read this first)

1. **Suggest, never decide.** Everything you write arrives as a suggestion. The founder confirms, rejects, accepts or places it in the app.
2. **Say what you based it on.** Every rating or claim you write must list the evidence IDs it rests on. If there are none, say so explicitly: the app shows those as guesses, and that is correct. A guess dressed up as a finding is the one thing this ledger cannot survive.
3. **Verify, then report.** After every task run `node tools/check.js` from the repository root and fix every PROBLEM and warning it reports before you tell the founder you're done. Paste its last line in your reply.
4. **UI changes follow `DESIGN.md`.** Before writing or changing anything the founder sees in the app (`index.html`), read `DESIGN.md` at the repository root: it pins the type, the one accent and its boundary, the status glyphs and the motion rule. It overrides instinct; the founder's pick overrides it.

## The three rules

1. **Quotes, not summaries.** Evidence is the customer's exact words from the transcript. Never paraphrase, shorten, merge or clean up a quote. If the exact words aren't in the transcript, it isn't evidence.
2. **Behavior, not interpretation.** What the person has already done (spent money, built a workaround, kept doing something painful) outweighs what they say they feel or would do.
3. **Argue against it.** Founders hear what they hope to hear, and an assistant's instinct is to agree. So you sit a little to the sceptical side. Look as hard for words that show a problem is mild, rare, already solved or not this person's as for words that show it. With no behavioral evidence an assumption is likely wrong until shown otherwise: confidence 2 of 5, never 3 by default, and opinion-only quotes never move it above 2. Every rating, score and note carries the strongest case against it, so the founder has to dismiss the objection on purpose. This isn't contrarianism: a Hair on Fire interview still scores Hair on Fire. It means you never hand over a number without the objection attached.

## What you may and may not change

- Write new files with `"status": "Candidate"`. Never write `"Confirmed"`. Only the founder confirms, in the app.
- Never edit a record whose status is `Confirmed` or `Rejected`. Create a new one instead, or say what you'd change in a note.
- Never edit `drm/transcripts/*.md`, `drm/config.json`, `drm/persona.json` or `README.md`.
- You may update these fields on an interview file: `recentInstance`, `leading`, `pitched`, `demoed`, `closing`, `rubricRun`, `coachingNote`.
- Never edit `leads[]` inside `drm/compass.json`: that is the founder's own Leads List. To propose a person, write a Candidate file in `drm/leads/`; the founder accepts it into their list, or dismisses it, in the app.
- Never edit `alternatives[]` inside `drm/compass.json`: that is the founder's own canvas. To propose an alternative or a competitor, write a Candidate file in `drm/competitors/`; the founder accepts it onto the canvas, or dismisses it, in the app. Never write `Accepted` or `Dismissed` yourself.
- Never write a pivot (`drm/pivots/`) unless its trigger assumption meets the gate in the **Poke holes** task. Only the founder accepts a pivot (`Active`) or retires it, in the app.
- IDs must be unique. Before creating a file, list the folder and use the next unused number.
- Keep JSON valid and keep every field listed below, even when empty (`""`, `[]`).

## The Compass: what the founder believes

Before any interviews, the founder fills in the Week 1 toolkit: a **Leaner Canvas** (problems, a solution for each, every customer segment with the ideal one labelled 1, existing alternatives), a **value proposition** ("If we help [customer] solve [problem] with [approach], they will choose it over [competitors] because our solution is [differentiation]"), a **problem statement** ("When [context], it leads to [complication], which matters because [consequence]"), an **assumptions map** and a **leads list**.

The canvas becomes points on the map. Each point has a `kind`: `problem`, `solution`, `customers`, `early-adopters`, `alternatives`, `competition` or `other`. The founder drags it into a 2×2 grid: vertical axis **impact** (1 inconvenient … 5 catastrophic if wrong), horizontal axis **confidence** (1 likely wrong … 5 likely right). Top-left is riskiest and gets tested first. Priority = impact × (6 − confidence). The grid has edges: `pos` is `{"x":0..1,"y":0..1}` inside the grid (x = confidence, y = impact) or `null` when the point sits on the shelf, unrated.

A point's **status** is computed by the app from discovery evidence and never from a typed score. It is one of five, left to right on the app's gauge: for a problem point, from the confirmed pain scores on its problem (n = how many; share = the fraction scored Hair on Fire or Incremental Improvement; "clean" = not counting weak interviews: friends or family, leading questions, a pitch or demo, or no recent instance):
- **Untested**: fewer than 2 confirmed scores. One story is not a pattern.
- **Contradicted**: 5 or more confirmed scores and 20% or fewer of them in the top two tiers.
- **Shaky**: 2 or more scores and the share is below 50%, or it reaches 50% only when weak interviews are counted.
- **Weak signal**: the clean interviews alone clear 50%, but fewer than 5 scores exist (or none of the clean ones is Hair on Fire).
- **Strong signal**: 5 or more scores, the clean interviews alone clear 50%, and at least one clean score is Hair on Fire.
Early-adopter and customer points read the same way on their segment's scores (interviews with that `customerId`), with a floor of 3 scores: Weak signal when the segment clears the bar on fewer than 3 clean scores or no other segment has been interviewed; Strong signal when it clears the bar on 3 or more clean scores and no other segment with 3 or more scores shows 25 points more pain; Contradicted when another segment does. Solution, alternatives, competition and other points are read from the confirmed quotes the founder tags for or against them: Untested with none tagged; Contradicted when against equals or outnumbers for; Shaky with only one quote for; Weak signal with 2 for, or with for less than twice against; Strong signal with 3 or more for and at least twice the against. Your job on the map is to rate each point with your own impact and confidence, say exactly what evidence that rests on, and propose points the founder missed. The app shows your rating on the opposite side of the page from the founder's, so never copy theirs.

The app reads the evidence back as **Insights**, one page per focus area: **Problem** (problem points; pain per problem), **Customers** (customers and early-adopter points; which segment feels it most, where the interviews came from, the places you suggest to find more people, the persona), **Solution** (solution points; workaround and past-behavior quotes; jobs and MVP scope are parked here for later) and **Alternatives and competition** (alternatives, competition and other points; it also shows the alternatives and competitors you propose as Candidate files in `drm/competitors/`, for the founder to accept onto the canvas or dismiss; the **Scan for alternatives and competitors** task refreshes them).

## Folder layout

```
drm/
  config.json          founder, venture
  compass.json         meta, solutions{problemId: text}, customers[], alternatives[], valueProp, problemStatement, riskiest, evidencePlan, leads[] (read-only for you)
  assumptions/A-01.json   one per assumption
  problems/PR-01.json  the problems the founder believes exist
  interviews/INT-001.json
  transcripts/INT-001.md   the full transcript, read-only for you
  evidence/INT-001-Q01.json   one quote per file
  pain-scores/INT-001__PR-01.json   one per interview-problem pair
  jobs/JB-01.json      jobs to be done (kept for later)
  places/PL-01.json    where to find people to interview, one place per file
  leads/LD-01.json     people you propose the founder talk to, one per file
  competitors/CP-01.json   alternatives and competitors you found, one per file
  pivots/PV-01.json    what you'd change if an assumption breaks, one move per file; only when the evidence has turned
  persona.json         the founder's persona draft (read-only for you)
  notes/2026-10-27-review-INT-001.md   your written reviews (Markdown)
```

### Record formats

Interview `drm/interviews/INT-001.json`
```json
{"id":"INT-001","date":"2026-10-27","interviewee":"Treasurer A","role":"Club treasurer","source":"Online community or follower","interviewer":"Sam","customerId":"C-01","placeId":"PL-01",
 "recentInstance":"Yes","leading":0,"pitched":"No","demoed":"No","closing":"Yes","rubricRun":true,"notes":"","coachingNote":""}
```
`source` is one of: `Stranger (cold outreach)`, `Online community or follower`, `Referral from an interviewee`, `Classmate or acquaintance`, `Friend or family`. Yes/No fields are the strings `"Yes"` or `"No"`. `placeId` is the place in `drm/places/` this person came from (`""` if none); the founder sets it, and the app uses it to show which places find real pain.

Evidence `drm/evidence/INT-001-Q01.json`
```json
{"id":"INT-001-Q01","interviewId":"INT-001","problemId":"PR-01","jobId":"","quote":"Last Sunday I spent about three hours matching receipts.","where":"12:40",
 "type":"Cost (time or money)","stance":"for","foundBy":"Claude Code","status":"Candidate","note":""}
```
`type` is exactly one of: `Past behavior, irreversible` · `Past behavior, reversible` · `Current workaround` · `Frequency` · `Cost (time or money)` · `Strong language` · `Opinion or future intent`.
`stance` is `for` when the quote shows the problem or what they do about it, `against` when it shows the problem is mild, rare, already solved or not theirs ("it only comes up once a year", "the spreadsheet is fine"). Write the against quotes too; they're the ones the founder won't go looking for.
`foundBy` is the name of your tool. `where` is the timestamp or the first words of the line.

Pain score `drm/pain-scores/INT-001__PR-01.json`
```json
{"id":"INT-001__PR-01","interviewId":"INT-001","problemId":"PR-01","tier":"Hair on Fire","evidenceIds":["INT-001-Q01","INT-001-Q02"],"scoredBy":"Claude Code","status":"Candidate","disagree":""}
```

Assumption `drm/assumptions/A-01.json`
```json
{"id":"A-01","seed":"problem:PR-01","kind":"problem","text":"Student club treasurers have this problem: chasing members for receipts","problemId":"PR-01","customerId":"","alternativeId":"",
 "impact":5,"confidence":3,"pos":{"x":0.5,"y":1},
 "aiImpact":5,"aiConfidence":2,"aiEvidence":["INT-001-Q01","INT-001-Q02"],"aiReason":"Everything rests on this. Two confirmed quotes from one treasurer show real cost and a kept workaround; one person is not a pattern.",
 "aiAgainst":"Both quotes come from one treasurer found through a poll she chose to answer; the second interview, a friend, called it not a big deal (INT-002-Q02).","aiWouldChange":"Three more treasurers from cold outreach who each describe a recent instance and a workaround they keep.",
 "evidence":[{"id":"INT-001-Q03","stance":"supports"}],"note":"","status":"Active","foundBy":"Founder"}
```
`kind` is one of `problem`, `solution`, `customers`, `early-adopters`, `alternatives`, `competition`, `other`. The founder owns `impact`, `confidence`, `pos`, `label` (where the text box sits next to the point), `text`, `evidence`, `note` and `status`: never change them. You own `aiImpact` (1 to 5, catastrophic if wrong = 5), `aiConfidence` (1 likely wrong … 5 likely right), `aiEvidence` (the evidence IDs you actually relied on; `[]` if none), `aiReason` (one or two sentences), `aiAgainst` (one sentence: the strongest evidence-based reason this assumption is wrong; required whenever you rate, and the app shows it before your numbers) and `aiWouldChange` (what evidence would move your rating). To propose a new assumption, write a file with `"status":"Candidate"`, `"pos":null`, `"impact":""`, `"confidence":""` and `"foundBy"` set to your tool name; the founder accepts or dismisses it. Interviews carry a `customerId` (a segment from compass.json) so pain can be compared across segments; if it's empty, say so in your note rather than guessing.

Problem `drm/problems/PR-02.json`
```json
{"id":"PR-02","text":"Members forget event payment deadlines","who":"Club treasurers"}
```
Only create a problem when the transcript shows one that isn't on the list. Write it the way the customer would say it, not as a solution.

Job `drm/jobs/JB-01.json`
```json
{"id":"JB-01","statement":"When reimbursement requests pile up at month end, I want every receipt in one place, so I can pay members back without chasing them.",
 "type":"Functional","problemId":"PR-01","workaround":"","moment":"","frequency":"Weekly","consequence":4,"decision":"Undecided","why":""}
```
`type`: Functional, Emotional or Social. `frequency`: Daily, Weekly, Monthly, A few times a year, Rarely. `consequence`: 5 (serious loss) to 1 (barely matters). Leave `decision` as `Undecided`; the founder chooses.

Place `drm/places/PL-01.json` (where to find people to interview)
```json
{"id":"PL-01","name":"Student union club-executive training","kind":"Event or meetup","url":"","how":"Ask the student union for the treasurer-training date and go.","who":"Student club treasurers","customerId":"C-01",
 "why":"Treasurer A learned the job at this training and still uses the sheet she built after it.","evidenceIds":["INT-001-Q02"],"verified":"","foundBy":"Claude Code","status":"Candidate","note":""}
```
`kind` is one of: `LinkedIn search`, `Online community`, `Event or meetup`, `Organisation or club`, `Referral`, `Other`. `why` names the interview or quote the place rests on, and `evidenceIds` lists those quotes; with none, write `"evidenceIds":[]` and say in `why` that it's a guess from the segment description: the app stamps it as a guess. `url` only if you actually opened it. `verified` is what you saw there (member count, how active, date you looked); leave it `""` if you couldn't check. `customerId` is a segment from compass.json. `opener` is the one-line first question to use there; leave it `""` and the app shows the one built from the problem statement.

Lead `drm/leads/LD-01.json` (a person the founder could talk to)
```json
{"id":"LD-01","name":"","role":"Treasurer who took over a club's books this term","customerId":"C-01","placeId":"PL-01","url":"","howFound":"Ask the student union who ran this term's club-executive training and for an intro to the treasurers who attended.",
 "why":"Resembles Treasurer A (INT-001), who learned the job at this training and built a sheet she still updates every week.","evidenceIds":["INT-001-Q02"],"opener":"","verified":"","foundBy":"Claude Code","status":"Candidate","note":""}
```
`status` is `Candidate` (yours), `Accepted` or `Dismissed` (the founder's, set in the app; never write them). `name` only if you actually saw it on a page you opened, with that page in `url`; otherwise leave `name` empty and describe the person in `role` plus where to find them in `howFound`. `why` names the interview or quote this person resembles, with the IDs in `evidenceIds`; with none, write `"evidenceIds":[]` and say in `why` that it's a guess from the segment description: the app stamps it as a guess. `verified` is what you saw and when. `customerId` is a segment from compass.json and `placeId` a file in `drm/places/`, or `""`. Never invent a name, a URL or a member count.

Competitor `drm/competitors/CP-01.json` (an alternative or a competitor you found)
```json
{"id":"CP-01","name":"Splitwise","kind":"competitor","url":"https://www.splitwise.com","what":"Shared-expense app for splitting bills among friends","gap":"Built for roommates and trips, not a treasurer reimbursing many members from one account","customerId":"C-01","problemId":"PR-01","why":"Treasurer A said members already use it for trips (INT-001-Q04); nobody said it works for the club.","evidenceIds":["INT-001-Q04"],"verified":"Opened 2026-10-30: free with a Pro tier, group expenses, no receipt-to-payment matching","foundBy":"Claude Code","status":"Candidate","note":""}
```
`kind` is `alternative` (what these people use today, including a spreadsheet, a group chat, or doing nothing) or `competitor` (a product sold to solve this problem). `name` only for something you actually found: for a competitor, a page you opened with that page in `url`; for an alternative, the thing the interviewee named in a confirmed quote. `what` is one line on what it is. `gap` is the gap it leaves for this customer, and it must say whether a quote shows that gap or it is your guess. `why` names the interview or quote it rests on, with the IDs in `evidenceIds`; with none, write `"evidenceIds":[]` and say in `why` that it's a guess from the segment and the problem: the app stamps it as a guess. `verified` is what you saw on the page and the date; `""` if you couldn't open it. `customerId` is a segment from compass.json and `problemId` a file in `drm/problems/`, or `""`. `status` is `Candidate` (yours), `Accepted` or `Dismissed` (the founder's, set in the app; never write them; accepting puts it on the Leaner Canvas as an alternative). Never invent a name, a URL, a price or a user count.

Pivot `drm/pivots/PV-01.json` (what the founder would change if an assumption breaks)
```json
{"id":"PV-01","triggerAssumptionIds":["A-03"],"kind":"problem","text":"Same treasurers, different problem: not collecting receipts from members, but matching the photos already in the group chat to the e-transfers.",
 "evidenceIds":["INT-001-Q03"],"why":"If members won't upload to any app, the collection step can't be fixed on the member side. INT-001-Q03 shows the club went back to the group chat, where the photos already are. One club, so a candidate only.",
 "foundBy":"Claude Code","status":"Candidate","note":""}
```
`kind` is one of the classic moves: `zoom-in` (one feature becomes the whole product), `customer-segment` (same problem, different people), `problem` (same people, different problem), `channel` (same product, different way to reach them), `value-capture` (same product, different buyer or pricing), `platform` (the tool becomes the product or the product becomes a tool). `triggerAssumptionIds` are the assumptions that have to be wrong for this move to make sense; `evidenceIds` are the confirmed quotes that point to it, and `why` says how. `status` is `Candidate` (yours), `Active` or `Retired` (the founder's, set in the app; never write them). The app shows a pivot only while every trigger is Shaky or Contradicted by confirmed evidence ("in play"); otherwise it's stamped "Not in play" and never counted. A pivot with no quotes behind it is a guess: say so in `why`, and never propose one from opinion quotes alone.

## The Pain Scale (score each interview-problem pair, by behavior)

- **Hair on Fire**: already invested money or recurring time they can't get back, and the problem is still not solved.
- **Incremental Improvement**: actively trying to fix it, but the effort is reversible (tried a tool and dropped it, stopped when a free trial ended).
- **Nice to Have**: describes the problem clearly but has done nothing about it. The most common trap.
- **Latent**: has the problem but doesn't see it as one. A flag to notice, not a buying signal.
- **Not a Problem**: no sign they have it.

Classify by what they did, not how they talk. Strong language supports a score but never decides it. When unsure between two tiers, choose the lower. If they couldn't describe a specific, recent instance, score no higher than Nice to Have.

The app and `tools/check.js` enforce these ties between a tier and the quotes it cites, so follow them exactly:
- **Hair on Fire** requires at least one cited quote of type `Past behavior, irreversible`.
- **Incremental Improvement** requires a cited quote of type `Past behavior, reversible` or `Current workaround`.
- A score whose cited quotes are all `Opinion or future intent` or `Strong language` can be **Nice to Have** at most.
- `recentInstance: "No"` on the interview caps the tier at Nice to Have.
- A score that cites a quote with `"stance":"against"` can't be Hair on Fire or Incremental Improvement; an against quote is a reason to score lower, not a justification.
- Cite only quotes that exist as files. Cite the quote IDs, not your memory of them.

## Tasks the founder may ask for

**Review interview INT-00x** (the main one). Work in two passes.

Pass 1, extract. Pass 2, verify: for every evidence file you wrote, search the transcript for the exact quote (`grep -F` on the transcript file, or re-read it). If it isn't there character for character, fix the quote or delete the file. Then check each pain score against the tier rules above. Only then run `node tools/check.js`.
1. Read `drm/transcripts/INT-00x.md`, `drm/interviews/INT-00x.json`, every file in `drm/problems/` and `drm/jobs/`, and any existing evidence for this interview.
2. Interview hygiene: count leading questions (questions that suggest an answer or ask about a hypothetical: "Would you use…", "Don't you hate…", "How much would you pay…"). Note whether the interviewer pitched or sold the idea, demoed a product, and asked something like "Is there anything I should have asked you but didn't?". Note whether the interviewee described a specific, recent instance of the problem. Update those fields on the interview file and set `rubricRun` to true.
3. Evidence: write one `drm/evidence/` file per quote that shows the problem, what they do about it, how often, what it costs, or how strongly they feel, and one per quote that shows the problem is mild, rare, already solved or not theirs (`"stance":"against"`). Copy the words exactly. Skip anything you can't quote exactly.
4. Pain scores: write one `drm/pain-scores/` file per problem the interviewee talked about, citing the evidence IDs that justify the tier. If a confirmed score already exists for that pair, don't overwrite it; mention your view in the note instead.
5. Write `drm/notes/YYYY-MM-DD-review-INT-00x.md`: the hygiene findings with the leading questions quoted; which problem looks strongest and which weakest, and why; the single strongest reason this interview should not count (a friend or family member, leading questions, a pitch, no specific recent instance) so the founder decides whether it does; and two or three questions to ask next time to get past opinions to behavior. Put the same two or three sentences in the interview's `coachingNote`.
6. Tell the founder what you wrote and remind them to confirm or reject each suggestion in the app.

**Rank the riskiest assumptions** (the app calls this **Diagnose my snapshot**): read `drm/compass.json`, every file in `drm/assumptions/`, the confirmed evidence and pain scores. For each active assumption:
1. Decide `aiImpact` (how much of the idea breaks if this is wrong; 5 = the whole thing) and `aiConfidence` (how likely it is to be right **given the confirmed evidence in this folder**, not general knowledge; with no evidence, confidence sits at 1 or 2, and opinion-only evidence never lifts it above 2).
2. List in `aiEvidence` the confirmed quote IDs you relied on. If none, write `[]`. Never list a quote you didn't read.
3. Write `aiReason`: one or two plain sentences. Start with the evidence ("Two confirmed quotes show…" or "No evidence yet; this rests on…"), then your reasoning. Where your rating differs from the founder's by 2 or more, say what you'd want to see to close the gap. Then write `aiAgainst` (the strongest evidence-based case that this assumption is wrong, one sentence, citing quote IDs where you have them) and `aiWouldChange` (the evidence that would move your rating).
4. Propose missing assumptions as Candidate files: a buyer who isn't the user, a channel, a switching cost, a competitor who could copy it, a regulatory or timing dependency. Keep it to three at most.
5. List the canvas statements that no interview can test, one line each saying why: a solution claim with no customer behaviour that could falsify it, a differentiation stated as a feature rather than something a customer would do differently, a segment too broad to recruit from, a consequence nobody could observe. Quote the statement and name the point or sheet it sits on.
6. Name the two interviews to run first: which segment (a `customerId` from compass.json), which assumption each one tests (the ID), and the opener built from the problem statement ("Have you experienced [context] / [complication]?"). Prefer the segment labelled ideal and the riskiest untested point; say so if the compass doesn't give you enough to choose.
7. Write `drm/notes/YYYY-MM-DD-assumptions.md`: the riskiest untested assumption, why, and the two interview questions that would test it; the untestable statements from step 5; and the two interviews from step 6. Then run `node tools/check.js`.
8. Then run **Scan for alternatives and competitors** so the competition on the Alternatives insight is as fresh as the ratings.

**Find where to interview next** (the Customers insight): the founder wants a list of places to find more of the right people, built from what the interviews have already shown, not from generic advice.
1. Read `drm/compass.json` (the ideal customer and the other segments), every interview file (`source`, `role`, `customerId`, `placeId`, `notes`), every transcript and the confirmed evidence. In the transcripts, look for where these people gather and what they already use: communities, group chats, tools, events, training, job titles, who referred them, who they said to talk to.
2. Work out the pain yield per place: for each place in `drm/places/`, count the interviews whose `placeId` is that place and how many of those have a **confirmed** pain score of Hair on Fire or Incremental Improvement (the Customers insight shows the same table). A place whose interviews keep scoring Nice to Have is producing the wrong people. Recommend more of what works: say in the note which places have found real pain and which haven't, and discount a place whose only strong scores come from a friend, a pitched interview or one with no recent instance. With no `placeId` set anywhere, say so instead of guessing.
3. If your tool can browse the web, do a directed search for each segment: LinkedIn job-title searches, subreddits, Discord and Slack communities, Facebook groups, meetups, campus organisations, conferences, newsletters. List a place only if you actually opened it, and write what you saw in `verified`. If you can't browse, leave `verified` as `""` and write the exact search to run in `how`.
4. Write up to eight `drm/places/PL-xx.json` files with `"status":"Candidate"`, numbered after the last existing one. Each `why` must name the interview or quote it rests on, with the IDs in `evidenceIds`; a place with no quote behind it says so in `why`. Never invent a URL, a member count or a quote. Don't duplicate a place that already has a file; update your own Candidate files instead.
5. Write `drm/notes/YYYY-MM-DD-where-to-look.md`: the pain yield per place so far; the three best places and why, which segment they reach, the one-line opener to use there, built from the problem statement ("Have you experienced [context] / [complication]?"), and which segments on the compass no interview has reached yet, so the sample's blind spots are on the page. Then run `node tools/check.js`.

**Find leads** (the Leads List sheet): the founder wants people to talk to, not just places. Take the ideal segment and one other segment from `drm/compass.json`.
1. Read every interview, transcript, confirmed quote and place, and the founder's own `leads[]` in compass.json so you don't repeat a name already there.
2. Propose up to eight `drm/leads/LD-xx.json` files with `"status":"Candidate"`, numbered after the last existing one. Put a name or handle in `name` only if you actually saw it on a page you opened, with that page in `url`; otherwise leave `name` empty and give a role description in `role` plus where to find that person in `howFound`. Each `why` names the interview or quote this person resembles, with the IDs in `evidenceIds`, or says it's a guess from the segment description. `verified` is what you saw and when; `""` if you couldn't check. Link each lead to a place with `placeId` where one fits. Never invent a name, a URL or a member count. Never write into `leads[]` in compass.json.
3. Write `drm/notes/YYYY-MM-DD-leads.md`: the leads in order of how closely they resemble the interviews that found real pain, the opener to use with each, and which segments on the compass no interview has reached yet. Then run `node tools/check.js`.

**Scan for alternatives and competitors** (the Alternatives and competition insight; the app asks for it with every Diagnose): the founder wants to know what these people use today and what is sold to them, built from the transcripts first and the web second, not from a list of well-known products.
1. Read `drm/compass.json` (the `alternatives[]` on the canvas and the "over" field of the value proposition), every transcript and every confirmed quote. In the transcripts, look for what these people already use and have tried: tools, apps, spreadsheets, group chats, people they pay, and anything they dropped. Those are alternatives with evidence: write one Candidate file for each, citing the quotes, unless the canvas already names it.
2. If your tool can browse the web: for each alternative and competitor the canvas names, and for the problem in the segment's own words, run directed searches (the product's own site and pricing page, "alternatives to X", app-store and review listings, the communities in `drm/places/`). List a competitor only if you opened its page, and write what you saw in `verified`. If you can't browse, say so at the top of the note, write the exact searches to run, and write no competitor file with a `url`.
3. Write up to eight `drm/competitors/CP-xx.json` files with `"status":"Candidate"`, numbered after the last existing one. Don't duplicate an entry already on the canvas (`alternatives[]` in compass.json, by name) or one that already has a file; update your own Candidate files instead. Say in `gap` whether any quote shows the gap, because a gap nobody has mentioned is the founder's hope, not a finding.
4. Write `drm/notes/YYYY-MM-DD-competitors.md`: what the interviewees actually use today (quote them, with IDs); what is sold to them that nobody mentioned; for each, the gap it leaves and whether a quote shows it; and which alternatives the founder named that no interviewee mentioned (that is a case against the canvas). Then run `node tools/check.js`.

**Research a segment C-0x**: given a segment id from `drm/compass.json`, write `drm/notes/YYYY-MM-DD-research-C-0x.md` with five short sections: who these people are; what they already use; where they gather; what they call the problem in their own words; and the three communities worth joining this week. Every claim links to a page you actually opened, with the date you opened it; anything you couldn't check is labelled a guess. Quote the founder's own interviews where they already answer a question (cite the IDs) and say where the web and the transcripts disagree. You may also propose places and leads from what you find, as Candidate files in `drm/places/` and `drm/leads/` under the rules above. If your tool can't browse, say so at the top and write the exact searches to run. Then run `node tools/check.js`.

**Audit the persona**: read `drm/persona.json` and the confirmed evidence. For each line, say whether the linked quotes actually support it, which lines are guesses, and which confirmed quotes they could cite. Write the result to `drm/notes/`. Don't edit persona.json.

**Rank the jobs**: read `drm/jobs/` and confirmed evidence. For each job, check the five qualifiers (named workaround, specific moment, how often, a confirmed cost quote, the customer's own words), suggest frequency and consequence where missing, and say which job looks like the wedge and what should go on the say-no list, with the evidence. Write to `drm/notes/`. You may fill empty `frequency`, `consequence`, `workaround` and `moment` fields on jobs; don't change `decision`.

**Happy ears check**: read confirmed evidence and say where the founder may be hearing what they want to hear: confirmed quotes that are opinions or future intent, pain scores whose cited evidence doesn't justify the tier, and problems whose "signal" rests on friends and family. Write to `drm/notes/`.

**Poke holes** (run it after every two interviews; the app suggests it): read `drm/compass.json`, every active assumption and the confirmed evidence and pain scores. Take the three assumptions with the highest founder priority (impact × (6 − confidence)), or the three highest by your own rating if the founder hasn't placed theirs.
1. For each, write the strongest case that it is wrong, using confirmed quotes only; cite the IDs. If no confirmed quote bears on it, say so: the case against is then "nothing has tested this", which is a case against.
2. Set `aiAgainst` and `aiWouldChange` on each of the three (and on any other rated assumption that is missing them).
3. Name the move the founder would make if it is wrong: a different segment, a different problem for the same people, a narrower slice, a different channel, or a different buyer. One line each, no detail; this is a note, not a plan. Then apply the pivot gate, in your own terms since you can't run the app:
   - A **problem** assumption is Contradicted or Shaky by the definitions under **The Compass**: at least 2 confirmed pain scores exist for its problem and fewer than half of them are Hair on Fire or Incremental Improvement, or that share is reached only with weak interviews (friends or family, leading questions, a pitch or demo, or no recent instance); Contradicted needs at least five scores with 20% or fewer in those tiers.
   - A **customers** or **early-adopters** assumption is Contradicted or Shaky when its segment (interviews with that `customerId`) has at least 3 confirmed pain scores and the same share test fails, or another segment with 3 or more scores shows at least 25 points more real pain.
   - Any **other** kind is Contradicted or Shaky when confirmed quotes tagged against it (`evidence[]` with `"stance":"contradicts"`) equal or outnumber those for it, or when only one quote supports it.
   - Untested (too few scores or no tagged quotes), Weak signal and Strong signal never open the gate.
   For a trigger assumption that meets the gate, write one `drm/pivots/PV-xx.json` Candidate file per move (list the folder and use the next unused number), citing in `evidenceIds` the confirmed quotes that point to that move and `foundBy` set to your tool name. Never propose a pivot from opinion or future-intent quotes alone. For an assumption that doesn't meet the gate, write nothing and say in the note "no pivot signal yet: N confirmed interviews short" (N = 2 minus the confirmed scores on its problem, or 3 minus the segment's scores) or "a weak or strong signal".
4. Give the one interview question that would settle each.
5. Write `drm/notes/YYYY-MM-DD-poke-holes.md` with the three cases, the moves (and for each whether a pivot file was written or why not) and the questions, then run `node tools/check.js`. It warns when a pivot's trigger doesn't meet the gate; fix that by deleting the pivot, not by arguing with the check.

## Style for notes

Plain language, short, specific, and honest. Never write "validated" or "proven" as praise; the ledger check flags them. Name a status only by its computed word (Contradicted, Shaky, Untested, Weak signal, Strong signal), never as a verdict of your own. End every note with a short **What would make this wrong** section: the evidence that would overturn what the note says. Quote the customer's words when you cite evidence. Name the interview and evidence IDs so the founder can click through in the app. Don't flatter; the founder is paying for the truth.

Method adapted from Darren Yee, "The Discovery Ladder" (https://darrenyee.substack.com/p/the-discovery-ladder).
