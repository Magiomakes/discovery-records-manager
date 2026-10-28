# Setting up your Discovery Records Manager (DRM)

About 15 minutes, once. You don't need to know how to code.

**What you're setting up:** your own private copy of the DRM on GitHub. Your interview notes live in a folder on your laptop and in that private copy. Nobody sees them unless you invite them, and your coach only sees them because you add them.

**What you need:**
- A laptop (Mac or Windows)
- **Google Chrome or Microsoft Edge.** Safari and Firefox can't save to a folder on your computer, so the app won't work in them.
- A free GitHub account

---

## Step 1. Make a GitHub account

Skip this if you already have one.

1. Go to [github.com/signup](https://github.com/signup) and create a free account.
2. Write down your username. Your coach will need it.

## Step 2. Make your private copy

1. Go to the [DRM template](https://github.com/Magiomakes/discovery-records-manager).
2. Click the green **Use this template** button, then **Create a new repository**.
3. Fill in:
   - **Repository name:** something like `my-drm` or `yourventure-drm`
   - **Visibility:** choose **Private**. This matters: your transcripts contain real people's words.
4. Click **Create repository**.

> Use **Use this template**, not **Fork**. A fork of this template would be public, and so would your interviews.

## Step 3. Give your coach access

1. In your new repository, click **Settings** (top bar), then **Collaborators** (left side).
2. Click **Add people** and type your coach's GitHub username.
3. Your coach gets an email and accepts the invite.

## Step 4. Put the folder on your laptop

1. Download **GitHub Desktop** from [desktop.github.com](https://desktop.github.com) and install it.
2. Open it and sign in with your GitHub account.
3. Click **File → Clone repository**, pick your new repository (for example `my-drm`) and choose where to save it, such as your Documents folder.
4. Click **Clone**. You now have a folder called `my-drm` on your laptop. Remember where it is.

## Step 5. Open the DRM app

1. In **Chrome or Edge**, go to **[magiomakes.github.io/discovery-records-manager](https://magiomakes.github.io/discovery-records-manager/)**. Bookmark it.
2. Click **Open my DRM folder** and choose the `my-drm` folder from Step 4. Pick the folder itself, not a file inside it.
3. When the browser asks whether the site can edit files, click **Edit files** (or **Allow**).
4. Type your name, your idea and your coach's name.
5. Write down **the problem you believe exists**, the way a customer would say it (not your solution). It's a guess for now, and your interviews will test it. Then click **Create my DRM**.

Done. Next time, open the bookmark and click **Reopen**.

> Want to look around first? Click **Try the demo with example data** on the welcome screen. Nothing is saved.

---

## Start with the Compass

After setup the app opens on **Your snapshot, in one sitting**: seven questions in plain words that fill in the five sheets below in one pass, with a "Put these on the map" button at the end. It's the Week 1 toolkit, as working documents you keep editing all program. Click any grey "Type here" and type.

1. **01 Leaner Canvas:** your top 1 to 3 problems, a possible solution for each, every possible customer with your ideal customer labelled 1, and how the problems are solved today.
2. **02 Value Proposition** and **03 Problem Statement:** fill in the blanks. The sheet shows the finished sentence and the first discovery question it gives you.
3. **04 Assumptions Map:** the whole screen is the map. Click anywhere to add a point and type its assumption; drag a point into the grid to rate it (up means catastrophic if wrong, left means likely wrong; top-left gets tested first; the grid's edge is as far as a point can go); drag its label to tidy up; right-drag to pan and scroll to zoom. Click a point: your rating floats on the left, your AI's on the right, and what the evidence says across the top. The Notes button pops out "My riskiest assumption" and "How I'll get evidence this week". Ask your AI to **Diagnose my snapshot**: it places its own dashed point next to yours, says what evidence that rests on, lists what's stated but untestable, proposes the assumptions hiding in your canvas, and names the two interviews to run first. A point it rates with no evidence is stamped as a guess.
4. **05 Leads List:** who you could talk to. Log an interview straight from a row.

From then on, every interview updates the map. A note's status (No evidence yet, Shaky, Holding up, Contradicted) comes from your confirmed pain scores and quotes, not from a score anyone types. **Insights** shows the picture by focus area: Problem, Customers, Solution, Alternatives and competition.

## Connect your AI

The DRM app is where you enter evidence and judge it. The reviewing is done by your own AI assistant, working directly on the same folder. The repository includes a rules file (`CLAUDE.md`, with a copy as `AGENTS.md`) that teaches it the format, the three rules, and that it may only ever suggest.

Pick whichever you use:
- **Claude Code:** open a terminal in your DRM folder and run `claude`. Done. It reads the rules automatically. You also get shortcuts like `/review-interview INT-001`.
- **Claude Desktop:** make a Project and connect your DRM folder to it (or add the folder to a conversation). Ask it to read `CLAUDE.md` the first time.
- **Cursor, Windsurf, Codex or another coding assistant:** open the DRM folder as the workspace. They read `AGENTS.md`.

No AI tool that can read your folder? Every interview page has a fallback where you copy a full prompt into any chat and paste the reply back.

## After every interview

1. In the app: **Interviews → New interview.** Paste the full transcript and click **Save transcript**. Fill in who it was and how you found them.
2. In your AI: say **Review interview INT-001** (the app shows you the exact line to copy). It reads the transcript and your problem list, pulls out quotes word for word, checks how you ran the interview, scores the pain, and writes a short note.
3. Back in the app, within a few seconds: **Review suggestions** lights up. Open each quote in the transcript. Confirm what's real and in their own words. Reject the rest. **Only confirmed items count anywhere.**
4. Read the AI's note under **AI notes**. It will tell you what to ask next time.
5. Level 1: fill in **Customer persona**, linking a confirmed quote to every line. Level 2: add **Jobs**, mark one as the wedge, and check **MVP scope**.

Other things to ask your AI, any time: **Diagnose my snapshot**, **Happy ears check**, **Audit the persona**, **Rank the jobs**, **Prepare for a coach meeting**. After each one it runs `node tools/check.js`, a check that every quote is word for word, every pain tier is justified by the quotes it cites, and every rating says what it rests on. You can see the same check under **Ledger check** in the app.

The three rules: **quotes, not summaries**, **behavior, not interpretation**, and **argue against it**: your AI leans slightly sceptical, so every rating comes with the strongest case against it and you dismiss the objection on purpose. It never confirms anything on your behalf.

## Before every coach meeting: push

Your coach only sees what you've pushed to GitHub.

1. Open **GitHub Desktop**. On the left you'll see the files that changed.
2. Bottom left, type a short summary like `Interviews 4 and 5`, then click **Commit to main**.
3. Click **Push origin** at the top.

Your coach opens your repository on GitHub and sees your **coach report** on the front page. It's rebuilt every time you save. You can preview it any time under **Coach report** in the app.

---

## Good to know

- **Where your data is:** everything is in the `drm` folder inside your repository, as plain text files. Use the app or your AI to change them rather than editing by hand.
- **Back it up by pushing.** If you don't push and lose your laptop, your notes are gone. Pushing weekly is a good habit even without a meeting.
- **Using another computer:** clone the repository there too (Step 4). Before you start, click **Fetch origin** then **Pull** in GitHub Desktop. When you're done, commit and push. Don't edit on two computers at the same time.
- **Interviewee names:** use first names or aliases like "Treasurer A". Ask people before you record or transcribe them.
- **Browser says it can't save:** you're in Safari or Firefox. Switch to Chrome or Edge.
- **It asks for permission every visit:** that's normal browser security. Click **Reopen**, then **Allow**.

## Credit

The method is adapted from Darren Yee's [The Discovery Ladder](https://darrenyee.substack.com/p/the-discovery-ladder) and [How to Actually Talk to Customers](https://darrenyee.substack.com/p/how-to-actually-talk-to-customers). This version covers Level 1 (Problem Discovery) and Level 2 (Jobs Discovery). The job scoring scales and signal thresholds are IIE coaching defaults, not from Darren's posts.
