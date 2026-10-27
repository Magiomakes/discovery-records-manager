# Discovery Records Manager: instructions for AI assistants

This folder is a founder's customer-discovery evidence ledger. The founder opens it in the DRM web app and also in you (Claude Code, Claude Desktop, Cursor, or another assistant that can read and write files here). You review the evidence and suggest; the founder decides.

## The two rules

1. **Quotes, not summaries.** Evidence is the customer's exact words from the transcript. Never paraphrase, shorten, merge or clean up a quote. If the exact words aren't in the transcript, it isn't evidence.
2. **Behavior, not interpretation.** What the person has already done (spent money, built a workaround, kept doing something painful) outweighs what they say they feel or would do.

## What you may and may not change

- Write new files with `"status": "Candidate"`. Never write `"Confirmed"`. Only the founder confirms, in the app.
- Never edit a record whose status is `Confirmed` or `Rejected`. Create a new one instead, or say what you'd change in a note.
- Never edit `drm/transcripts/*.md`, `drm/config.json`, `drm/persona.json` or `README.md` (the app rebuilds README.md on every save).
- You may update these fields on an interview file: `recentInstance`, `leading`, `pitched`, `demoed`, `closing`, `rubricRun`, `coachingNote`.
- IDs must be unique. Before creating a file, list the folder and use the next unused number.
- Keep JSON valid and keep every field listed below, even when empty (`""`, `[]`).

## The Compass: what the founder believes

Before any interviews, the founder writes down hunches in the Compass: the solution they imagine, the problems they suspect, every customer segment and which one is the ideal first customer, the competitors and alternatives people use today, a problem statement and a value proposition. Those hunches become **assumptions**, each rated for impact (how much breaks if it's wrong) and uncertainty (how little is known), 1 to 5. Priority is impact × uncertainty.

Each assumption's status (Untested, Shaky, Holding up, Contradicted) is computed by the app from discovery evidence, never from a score: problem assumptions from confirmed pain scores, the customer assumption by comparing pain across segments, and alternative/solution/value assumptions from confirmed quotes the founder tags as for or against. Your job on assumptions is to rate, explain and spot what's missing, and to point interviews at the riskiest untested ones.

## Folder layout

```
drm/
  config.json          founder, venture, coach, minInterviews, strongShare
  compass.json         solution, customers[], alternatives[], problemStatement, valueProp (read-only for you)
  assumptions/A-01.json   one per assumption
  problems/PR-01.json  the problems the founder believes exist
  interviews/INT-001.json
  transcripts/INT-001.md   the full transcript, read-only for you
  evidence/INT-001-Q01.json   one quote per file
  pain-scores/INT-001__PR-01.json   one per interview-problem pair
  jobs/JB-01.json      Level 2 jobs to be done
  persona.json         the founder's persona draft (read-only for you)
  notes/2026-10-27-review-INT-001.md   your written reviews (Markdown)
```

### Record formats

Interview `drm/interviews/INT-001.json`
```json
{"id":"INT-001","date":"2026-10-27","interviewee":"Treasurer A","role":"Club treasurer","source":"Online community or follower","interviewer":"Sam",
 "recentInstance":"Yes","leading":0,"pitched":"No","demoed":"No","closing":"Yes","rubricRun":true,"notes":"","coachingNote":""}
```
`source` is one of: `Stranger (cold outreach)`, `Online community or follower`, `Referral from an interviewee`, `Classmate or acquaintance`, `Friend or family`. Yes/No fields are the strings `"Yes"` or `"No"`.

Evidence `drm/evidence/INT-001-Q01.json`
```json
{"id":"INT-001-Q01","interviewId":"INT-001","problemId":"PR-01","jobId":"","quote":"Last Sunday I spent about three hours matching receipts.","where":"12:40",
 "type":"Cost (time or money)","foundBy":"Claude Code","status":"Candidate","note":""}
```
`type` is exactly one of: `Past behavior, irreversible` · `Past behavior, reversible` · `Current workaround` · `Frequency` · `Cost (time or money)` · `Strong language` · `Opinion or future intent`.
`foundBy` is the name of your tool. `where` is the timestamp or the first words of the line.

Pain score `drm/pain-scores/INT-001__PR-01.json`
```json
{"id":"INT-001__PR-01","interviewId":"INT-001","problemId":"PR-01","tier":"Hair on Fire","evidenceIds":["INT-001-Q01","INT-001-Q02"],"scoredBy":"Claude Code","status":"Candidate","disagree":""}
```

Assumption `drm/assumptions/A-01.json`
```json
{"id":"A-01","seed":"problem:PR-01","kind":"problem","text":"Student club treasurers have this problem: chasing members for receipts","problemId":"PR-01","customerId":"","alternativeId":"",
 "impact":5,"uncertainty":3,"aiImpact":5,"aiUncertainty":4,"aiReason":"Everything rests on this and there is one strong interview so far.","evidence":[{"id":"INT-001-Q03","stance":"supports"}],"note":"","status":"Active","foundBy":"Founder"}
```
`kind` is one of `problem`, `customer`, `alternative`, `solution`, `value`. You may set `aiImpact`, `aiUncertainty` (1 to 5) and `aiReason` on any assumption. Never change `impact`, `uncertainty`, `text`, `evidence` or `status` on a founder's assumption. To propose a new assumption, write a file with `"status":"Candidate"` and `"foundBy"` set to your tool name; the founder accepts or dismisses it. Interviews carry a `customerId` (a segment from compass.json) so pain can be compared across segments; if it's empty, say so in your note rather than guessing.

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

## The Pain Scale (score each interview-problem pair, by behavior)

- **Hair on Fire**: already invested money or recurring time they can't get back, and the problem is still not solved.
- **Incremental Improvement**: actively trying to fix it, but the effort is reversible (tried a tool and dropped it, stopped when a free trial ended).
- **Nice to Have**: describes the problem clearly but has done nothing about it. The most common trap.
- **Latent**: has the problem but doesn't see it as one. A coaching flag, not a buying signal.
- **Not a Problem**: no sign they have it.

Classify by what they did, not how they talk. Strong language supports a score but never decides it. When unsure between two tiers, choose the lower. If they couldn't describe a specific, recent instance, score no higher than Nice to Have.

## Tasks the founder may ask for

**Review interview INT-00x** (the main one)
1. Read `drm/transcripts/INT-00x.md`, `drm/interviews/INT-00x.json`, every file in `drm/problems/` and `drm/jobs/`, and any existing evidence for this interview.
2. Interview hygiene: count leading questions (questions that suggest an answer or ask about a hypothetical: "Would you use…", "Don't you hate…", "How much would you pay…"). Note whether the interviewer pitched or sold the idea, demoed a product, and asked something like "Is there anything I should have asked you but didn't?". Note whether the interviewee described a specific, recent instance of the problem. Update those fields on the interview file and set `rubricRun` to true.
3. Evidence: write one `drm/evidence/` file per quote that shows the problem, what they do about it, how often, what it costs, or how strongly they feel. Copy the words exactly. Skip anything you can't quote exactly.
4. Pain scores: write one `drm/pain-scores/` file per problem the interviewee talked about, citing the evidence IDs that justify the tier. If a confirmed score already exists for that pair, don't overwrite it; mention your view in the note instead.
5. Write `drm/notes/YYYY-MM-DD-review-INT-00x.md`: the hygiene findings with the leading questions quoted, which problem looks strongest and why, and two or three questions to ask next time to get past opinions to behavior. Put the same two or three sentences in the interview's `coachingNote`.
6. Tell the founder what you wrote and remind them to confirm or reject each suggestion in the app.

**Rank the riskiest assumptions**: read `drm/compass.json`, every file in `drm/assumptions/`, the confirmed evidence and pain scores. For each active assumption set `aiImpact`, `aiUncertainty` and a one-sentence `aiReason` that cites evidence IDs where there are any. Where the founder's rating and yours differ by 2 or more, say why in the note. Propose assumptions the snapshot implies but the founder hasn't written (a buyer who isn't the user, a channel, a switching cost) as Candidate files. Finish with a note in `drm/notes/` that names the single riskiest untested assumption and the two interview questions that would test it.

**Audit the persona**: read `drm/persona.json` and the confirmed evidence. For each line, say whether the linked quotes actually support it, which lines are guesses, and which confirmed quotes they could cite. Write the result to `drm/notes/`. Don't edit persona.json.

**Rank the jobs**: read `drm/jobs/` and confirmed evidence. For each job, check the five qualifiers (named workaround, specific moment, how often, a confirmed cost quote, the customer's own words), suggest frequency and consequence where missing, and say which job looks like the wedge and what should go on the say-no list, with the evidence. Write to `drm/notes/`. You may fill empty `frequency`, `consequence`, `workaround` and `moment` fields on jobs; don't change `decision`.

**Prepare for a coach meeting**: read everything. Write a one-page note: interviews so far and their hygiene, share from friends or family, confirmed Hair on Fire interviews per problem, confirmed quotes that are only opinion, persona lines without quotes, open candidates not yet reviewed, and the three things the coach is most likely to push on. Write to `drm/notes/`.

**Happy ears check**: read confirmed evidence and say where the founder may be hearing what they want to hear: confirmed quotes that are opinions or future intent, pain scores whose cited evidence doesn't justify the tier, and problems whose "signal" rests on friends and family. Write to `drm/notes/`.

## Style for notes

Plain language, short, specific, and honest. Quote the customer's words when you cite evidence. Name the interview and evidence IDs so the founder can click through in the app. Don't flatter; the founder is paying for the truth.

Method adapted from Darren Yee, "The Discovery Ladder" (https://darrenyee.substack.com/p/the-discovery-ladder).
