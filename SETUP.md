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
4. Type your name, your idea and your coach's name, then click **Create my DRM**.

Done. Next time, open the bookmark and click **Reopen**.

> Want to look around first? Click **Try the demo with example data** on the welcome screen. Nothing is saved.

---

## After every interview

1. **Interviews → + New interview.** Paste the full transcript and click **Save transcript**.
2. Click **Copy rubric prompt**. It already includes your interview ID, your problem list and the transcript.
3. Paste it into any AI chat (Claude, ChatGPT or another) and send it.
4. Copy the AI's **whole** reply. Back in the DRM, open **Paste rubric results**, paste it and click **Check it**.
5. Read the preview. Anything marked **not in transcript** means the AI changed the customer's words. Then click **Import as candidates**.
6. Go to **Review AI suggestions**. Confirm ✓ what's real and in their own words. Reject ✕ the rest. **Only confirmed items count anywhere.**

The two rules: **quotes, not summaries** and **behavior, not interpretation.**

## Before every coach meeting: push

Your coach only sees what you've pushed to GitHub.

1. Open **GitHub Desktop**. On the left you'll see the files that changed.
2. Bottom left, type a short summary like `Interviews 4 and 5`, then click **Commit to main**.
3. Click **Push origin** at the top.

Your coach opens your repository on GitHub and sees your **coach report** on the front page. It's rebuilt every time you save. You can preview it any time under **Coach report** in the app.

---

## Good to know

- **Where your data is:** everything is in the `drm` folder inside your repository, as plain text files. Don't edit them by hand; use the app.
- **Back it up by pushing.** If you don't push and lose your laptop, your notes are gone. Pushing weekly is a good habit even without a meeting.
- **Using another computer:** clone the repository there too (Step 4). Before you start, click **Fetch origin** then **Pull** in GitHub Desktop. When you're done, commit and push. Don't edit on two computers at the same time.
- **Interviewee names:** use first names or aliases like "Treasurer A". Ask people before you record or transcribe them.
- **Browser says it can't save:** you're in Safari or Firefox. Switch to Chrome or Edge.
- **It asks for permission every visit:** that's normal browser security. Click **Reopen**, then **Allow**.

## Credit

The method is adapted from Darren Yee's [The Discovery Ladder](https://darrenyee.substack.com/p/the-discovery-ladder) and [How to Actually Talk to Customers](https://darrenyee.substack.com/p/how-to-actually-talk-to-customers). This version covers Level 1 (Problem Discovery) and Level 2 (Jobs Discovery). The job scoring scales and signal thresholds are IIE coaching defaults, not from Darren's posts.
