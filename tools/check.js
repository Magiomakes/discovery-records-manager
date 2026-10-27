#!/usr/bin/env node
/* Ledger check for the Discovery Records Manager.
   Run from the repo root:  node tools/check.js
   Exit code 1 when there are problems. AI assistants: run this after every task and fix what it reports. */
const fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..", "drm");
const read = d => { const dir = path.join(root, d); if (!fs.existsSync(dir)) return []; return fs.readdirSync(dir).filter(f => f.endsWith(".json")).map(f => { try { return {file: d + "/" + f, ...JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))}; } catch (e) { return {file: d + "/" + f, _unreadable: e.message}; } }); };
const interviews = read("interviews"), evidence = read("evidence"), pains = read("pain-scores"), problems = read("problems"), assumptions = read("assumptions"), jobs = read("jobs");
const transcripts = {}; const tdir = path.join(root, "transcripts"); if (fs.existsSync(tdir)) for (const f of fs.readdirSync(tdir)) if (f.endsWith(".md")) transcripts[f.slice(0, -3)] = fs.readFileSync(path.join(tdir, f), "utf8");
const TYPES = ["Past behavior, irreversible","Past behavior, reversible","Current workaround","Frequency","Cost (time or money)","Strong language","Opinion or future intent"];
const TIERS = ["Hair on Fire","Incremental Improvement","Nice to Have","Latent","Not a Problem"];
const out = []; const bad = (w, m) => out.push(["PROBLEM", w, m]); const warn = (w, m) => out.push(["warning", w, m]); const note = (w, m) => out.push(["note", w, m]);
function quoteRegex(q){ const t = String(q||"").trim().replace(/^["“”']+|["“”']+$/g, "").trim(); if (t.length < 4) return null; const body = t.split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/['’‘]/g, "['’‘]").replace(/["“”]/g, '["“”]')).join("\\s+"); try { return new RegExp(body, "i"); } catch (e) { return null; } }
const byId = (list, id) => list.find(r => r.id === id);
for (const r of [...interviews, ...evidence, ...pains, ...problems, ...assumptions, ...jobs]) { if (r._unreadable) bad(r.file, "Not valid JSON: " + r._unreadable); else if (!r.id) bad(r.file, "Missing id"); else if (r.file.split("/")[1] !== r.id + ".json") warn(r.file, `File name doesn't match id ${r.id}`); }
const seen = new Set(); for (const r of [...interviews, ...evidence, ...pains, ...problems, ...assumptions, ...jobs]) { if (!r.id) continue; if (seen.has(r.id)) bad(r.file, "Duplicate id " + r.id); seen.add(r.id); }
for (const e of evidence) {
  if (e._unreadable || !e.id) continue;
  if (!["Candidate","Confirmed","Rejected"].includes(e.status)) bad(e.file, `Bad status "${e.status}"`);
  if (e.status === "Rejected") continue;
  if (!byId(interviews, e.interviewId)) bad(e.file, `interviewId ${e.interviewId} doesn't exist`);
  if (e.problemId && !byId(problems, e.problemId) && !/^NEW/i.test(e.problemId)) warn(e.file, `problemId ${e.problemId} doesn't exist`);
  if (!TYPES.includes(e.type)) warn(e.file, `type "${e.type}" isn't one of the seven evidence types`);
  const t = transcripts[e.interviewId];
  if (!t) warn(e.file, "No transcript to check the quote against");
  else { const re = quoteRegex(e.quote); if (!re || !re.test(t)) bad(e.file, "Quote is not in the transcript word for word. Fix it or delete it; a paraphrase is not evidence."); }
}
for (const p of pains) {
  if (p._unreadable || !p.id) continue;
  if (!TIERS.includes(p.tier)) bad(p.file, `tier "${p.tier}" isn't on the Pain Scale`);
  if (!["Candidate","Confirmed","Rejected"].includes(p.status)) bad(p.file, `Bad status "${p.status}"`);
  if (p.status === "Rejected") continue;
  const ev = (p.evidenceIds || []).map(id => byId(evidence, id)); const missing = (p.evidenceIds || []).filter((id, i) => !ev[i]);
  if (missing.length) bad(p.file, "Cites quotes that don't exist: " + missing.join(", "));
  const types = new Set(ev.filter(Boolean).map(e => e.type)); const iv = byId(interviews, p.interviewId);
  if (!ev.length && p.tier !== "Not a Problem") warn(p.file, "No quotes cited. A tier needs evidence behind it.");
  if (["Hair on Fire","Incremental Improvement"].includes(p.tier) && iv && iv.recentInstance === "No") warn(p.file, "No specific, recent instance, so the ceiling is Nice to Have.");
  if (p.tier === "Hair on Fire" && !types.has("Past behavior, irreversible")) warn(p.file, "Hair on Fire needs a cited quote of type 'Past behavior, irreversible'.");
  if (p.tier === "Incremental Improvement" && !types.has("Past behavior, reversible") && !types.has("Current workaround") && !types.has("Past behavior, irreversible")) warn(p.file, "Incremental Improvement needs a cited quote showing they tried something.");
  if (ev.filter(Boolean).length && [...types].every(t => ["Opinion or future intent","Strong language"].includes(t)) && ["Hair on Fire","Incremental Improvement"].includes(p.tier)) warn(p.file, "Every cited quote is opinion or language; those can't decide a tier.");
}
for (const a of assumptions) {
  if (a._unreadable || !a.id) continue;
  if (!["Candidate","Active","Retired"].includes(a.status)) bad(a.file, `Bad status "${a.status}"`);
  if (a.status === "Retired") continue;
  const rated = a.aiImpact || a.aiConfidence || a.aiReason;
  if (rated) {
    const ids = (a.aiEvidence || []).filter(Boolean);
    if (!ids.length) note(a.file, "AI rating lists no evidence. That's allowed, but it must say so: the app shows it as a guess.");
    const missing = ids.filter(id => !byId(evidence, id)); if (missing.length) bad(a.file, "aiEvidence cites quotes that don't exist: " + missing.join(", "));
    for (const k of ["aiImpact","aiConfidence"]) if (a[k] !== "" && !(Number(a[k]) >= 1 && Number(a[k]) <= 5)) bad(a.file, `${k} must be 1 to 5`);
    if (!a.aiReason) warn(a.file, "AI rating has no aiReason");
  }
}
for (const iv of interviews) { if (iv._unreadable || !iv.id) continue; if (!transcripts[iv.id]) warn(iv.file, "No transcript saved"); if (iv.rubricRun && !["Yes","No"].includes(iv.recentInstance)) warn(iv.file, "Reviewed but recentInstance isn't Yes or No"); }
const counts = {PROBLEM:0, warning:0, note:0}; for (const [s] of out) counts[s]++;
for (const [s, w, m] of out.sort((x, y) => ["PROBLEM","warning","note"].indexOf(x[0]) - ["PROBLEM","warning","note"].indexOf(y[0]))) console.log(`${s.padEnd(8)} ${w}: ${m}`);
console.log(`\n${counts.PROBLEM} problem(s), ${counts.warning} warning(s), ${counts.note} note(s). ${interviews.length} interviews, ${evidence.length} quotes, ${pains.length} pain scores, ${assumptions.length} assumptions.`);
process.exit(counts.PROBLEM ? 1 : 0);
