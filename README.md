# Discovery Records Manager (DRM)

A free, private evidence log for customer discovery. Founders record what customers **actually said and did**, in their own words, then turn it into an evidence-backed Customer Persona (Level 1) and an MVP Scope (Level 2).

**[Open the app](https://magiomakes.github.io/discovery-records-manager/)** · **[Try the demo](https://magiomakes.github.io/discovery-records-manager/?demo=1)** · **[Founder setup guide](SETUP.md)**

## How it works

- Each founder makes a **private** copy of this repository with **Use this template** (not Fork, since forks of this repo are public).
- The app runs in Chrome or Edge and saves into the founder's own copy on their laptop. Nothing is stored on a server.
- The founder's own AI assistant (Claude Code, Claude Desktop, Cursor, or similar) works on the same folder. `CLAUDE.md` / `AGENTS.md` teach it the format and the rules. The founder asks it to review an interview; it writes quotes, pain scores and a note into the folder as suggestions. The app notices within seconds, checks every quote **word for word** against the transcript, and shows them for the founder to confirm or reject. The AI never confirms anything.
- When the founder pushes with GitHub Desktop, this README is replaced by their **coach report**: interviews, interview hygiene, pain scores per problem, persona and MVP scope. Coaches just open the repository.

## For coaches

1. Ask the founder to add you as a collaborator (Settings → Collaborators).
2. Open their repository on GitHub. The front page is their coach report, updated to their last push.
3. Things worth a conversation:
   - **Hygiene issues:** leading questions, pitching or demoing in a discovery interview
   - **Share of interviews from friends or family**
   - **Confirmed quotes that are only opinion** ("I would use it")
   - **Persona lines with no confirmed quote** behind them
   - **AI suggestions not yet reviewed**

The raw data is in the `drm/` folder as readable JSON and Markdown, and the transcripts are in `drm/transcripts/`.

## Method

Adapted from Darren Yee's [The Discovery Ladder](https://darrenyee.substack.com/p/the-discovery-ladder): a five-tier Pain Scale (Hair on Fire, Incremental Improvement, Nice to Have, Latent, Not a Problem), scored by behavior rather than language, and jobs ranked by frequency × consequence. This version covers Levels 1 and 2.

Built for founders coached through the Institute for Innovation and Entrepreneurship at Mount Royal University.
