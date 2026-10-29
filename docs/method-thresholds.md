# Method thresholds: what Darren Yee's posts say, and what the app sets

Read in full on 2026-10-28: "The Discovery Ladder" (Ladder) and "How to Actually Talk to Customers" (Talk), darrenyee.substack.com. Quotes are verbatim. Where a post is silent, the constant stays a coaching default and this note says so.

## 1. How many interviews

No number. Ladder says Level 2 starts "After enough Level 1 conversations" and never defines enough; the only figures are his own history ("it took me about 250 interviews before I could do this in three minutes") and a promise: "knowing exactly when they have enough evidence to start prototyping". Talk's hundreds of conversations belong to a team that learned nothing.

For the app: `minInterviews: 5` stays a coaching default; the rules file says so.

## 2. What counts as a signal

He scores "every customer-problem pair" and names a zone, not a share: "Your target zone is the top two tiers." (Ladder). His rubric reports a count: "exactly how many interviews are at the hair-on-fire stage of pain" (Ladder). No share or threshold anywhere.

For the app: the top-two zone comes from the post; the 50% share is a coaching default. Show the count ("3 of 6") before the share, since the count is what he reports.

## 3. Weak versus strong

Graded per person, not per problem: "Irreversible investment is the strong signal." and "Reversible investment is the trap." (Talk). Across interviews the language is binary: "If the signals aren't there, you are not done" (Ladder). Silent on grading a problem across a sample.

For the app: five statuses are a coaching extension; the per-person grading is his, the aggregate cut-offs are ours.

## 4. The Pain Scale and classification

The five tiers in CLAUDE.md match Ladder word for word, and so do the two rules: "When you are unsure, score lower" and "when language and behavior disagree, classify by behavior" (Ladder). Strong words "with nothing behind it is performance" (Ladder). Hair on Fire is "Investment without resolution. This is who you build for first."

One tension: Talk counts strong language as a hair-on-fire signal ("Flat language usually means you haven't found a hair-on-fire problem"); Ladder, the later post, says behavior decides, and the app follows Ladder. The tier-to-quote-type ties in `tools/check.js` mechanise his definitions, not rules he wrote.

For the app: keep the section; cite Ladder.

## 5. Segments and the ideal customer

"organizations don't buy things, people do" (Ladder): find the one person who owns a slice of the workflow. Not a Problem is "useful mainly for sharpening who your customer actually is" (Ladder). The hair-on-fire person is "your ideal first customer"; those needing more proof are "a bigger market" (Talk). Silent on comparing segments or switching.

For the app: the segment comparison (3 scores, 25-point gap) is entirely a coaching default; say so where it's shown.

## 6. Interview hygiene

"Don't lead the witness." (Ladder); a would-you question "is a future-oriented hypothetical" (Ladder); "we tell them not to sell or do demos on the first call" (Ladder); the closer "Is there anything I should have asked you but didn't?" (Ladder); and "Vague problems that can't produce a concrete last-time story are almost never on fire." (Talk): "treat it as a no". Friends and family: silent.

For the app: `leading`, `pitched`, `demoed`, `closing` and `recentInstance` each cite a post; the friends-and-family discount is a coaching default (Fitzpatrick's Mom Test, in Ladder's lineage list).

## 7. When the evidence turns

"treat the descent as the win" (Ladder): evidence may show "the pain you scored as hair-on-fire was overstated", and going back a level is progress. On fixed thresholds: "An experiment without a written kill criterion is a product in disguise" (Ladder). The six pivot moves are Ries's; neither post names them.

For the app: the pivot gate is a coaching mechanism. The kill-criterion line is the case for B2: set thresholds before interviewing, never after.

## Proposed constants and statuses

- `minInterviews = 5` (coaching default; posts silent).
- `strongShare = 0.5` of confirmed scores in the top two tiers (the zone from Ladder; 50% a coaching default).
- A weak interview: friend or family, leading questions, pitch or demo, or no recent instance (all but friends and family from the posts).

Per problem, from confirmed scores:

1. **Untested**: fewer than 2 confirmed scores; one story is not a pattern (coaching default).
2. **Contradicted**: at least `minInterviews` scores and 20% or fewer in the top zone (coaching default).
3. **Shaky**: at least 2 scores and the top-zone share is below the bar, or reaches it only when weak interviews count ("score lower" from Ladder; bar and discount coaching defaults). B1's draft put weak-only clearance under Weak signal; Shaky keeps the pivot gate open, the sceptical reading.
4. **Weak signal**: clean interviews alone clear the bar, but fewer than `minInterviews` scores exist (coaching default).
5. **Strong signal**: at least `minInterviews` scores, clean interviews alone clear the bar, and at least one clean score is Hair on Fire, following "This is who you build for first" (Ladder): five Incremental Improvement interviews give nobody to build for first. The count is ours.

Only Shaky and Contradicted open the pivot gate, as today.

## What would make this wrong

A later Yee post naming a number or a share replaces the defaults and this note. If his unpublished Level 1 rubric grades a problem across interviews, the statuses should match it. If the founder's five levels are per interview, not per problem, these statuses are the wrong shape.
