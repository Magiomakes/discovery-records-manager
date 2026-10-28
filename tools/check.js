#!/usr/bin/env node
/* Ledger check for the Discovery Records Manager.
   Run from the repo root:  node tools/check.js
   Exit code 1 when there are problems. AI assistants: run this after every task and fix what it reports. */
const fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..", "drm");
const read = d => { const dir = path.join(root, d); if (!fs.existsSync(dir)) return []; return fs.readdirSync(dir).filter(f => f.endsWith(".json")).map(f => { try { return {file: d + "/" + f, ...JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))}; } catch (e) { return {file: d + "/" + f, _unreadable: e.message}; } }); };
const interviews = read("interviews"), evidence = read("evidence"), pains = read("pain-scores"), problems = read("problems"), assumptions = read("assumptions"), jobs = read("jobs"), places = read("places"), leads = read("leads"), pivots = read("pivots");
let compass = {}; try { compass = JSON.parse(fs.readFileSync(path.join(root, "compass.json"), "utf8")); } catch (e) {}
let config = {}; try { config = JSON.parse(fs.readFileSync(path.join(root, "config.json"), "utf8")); } catch (e) {}
const transcripts = {}; const tdir = path.join(root, "transcripts"); if (fs.existsSync(tdir)) for (const f of fs.readdirSync(tdir)) if (f.endsWith(".md")) transcripts[f.slice(0, -3)] = fs.readFileSync(path.join(tdir, f), "utf8");
const TYPES = ["Past behavior, irreversible","Past behavior, reversible","Current workaround","Frequency","Cost (time or money)","Strong language","Opinion or future intent"];
const TIERS = ["Hair on Fire","Incremental Improvement","Nice to Have","Latent","Not a Problem"];
const KINDS = ["problem","solution","customers","early-adopters","alternatives","competition","other"];
const PLACE_KINDS = ["LinkedIn search","Online community","Event or meetup","Organisation or club","Referral","Other"];
const PIVOT_KINDS = ["zoom-in","customer-segment","problem","channel","value-capture","platform"];
const out = []; const bad = (w, m) => out.push(["PROBLEM", w, m]); const warn = (w, m) => out.push(["warning", w, m]); const note = (w, m) => out.push(["note", w, m]);
function quoteRegex(q){ const t = String(q||"").trim().replace(/^["“”']+|["“”']+$/g, "").trim(); if (t.length < 4) return null; const body = t.split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/['’‘]/g, "['’‘]").replace(/["“”]/g, '["“”]')).join("\\s+"); try { return new RegExp(body, "i"); } catch (e) { return null; } }
const byId = (list, id) => list.find(r => r.id === id);
for (const r of [...interviews, ...evidence, ...pains, ...problems, ...assumptions, ...jobs, ...places, ...leads, ...pivots]) { if (r._unreadable) bad(r.file, "Not valid JSON: " + r._unreadable); else if (!r.id) bad(r.file, "Missing id"); else if (r.file.split("/")[1] !== r.id + ".json") warn(r.file, `File name doesn't match id ${r.id}`); }
const seen = new Set(); for (const r of [...interviews, ...evidence, ...pains, ...problems, ...assumptions, ...jobs, ...places, ...leads, ...pivots]) { if (!r.id) continue; if (seen.has(r.id)) bad(r.file, "Duplicate id " + r.id); seen.add(r.id); }
for (const e of evidence) {
  if (e._unreadable || !e.id) continue;
  if (!["Candidate","Confirmed","Rejected"].includes(e.status)) bad(e.file, `Bad status "${e.status}"`);
  if (e.status === "Rejected") continue;
  if (!byId(interviews, e.interviewId)) bad(e.file, `interviewId ${e.interviewId} doesn't exist`);
  if (e.problemId && !byId(problems, e.problemId) && !/^NEW/i.test(e.problemId)) warn(e.file, `problemId ${e.problemId} doesn't exist`);
  if (!TYPES.includes(e.type)) warn(e.file, `type "${e.type}" isn't one of the seven evidence types`);
  if (e.stance !== undefined && !["for","against"].includes(e.stance)) warn(e.file, `stance "${e.stance}" must be for or against`);
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
  const against = ev.filter(e => e && e.stance === "against").length;
  if (against && ["Hair on Fire","Incremental Improvement"].includes(p.tier)) warn(p.file, `Cites ${against} quote(s) tagged against the problem. An against quote lowers a tier; it can't justify a strong one.`);
}
for (const a of assumptions) {
  if (a._unreadable || !a.id) continue;
  if (!["Candidate","Active","Retired"].includes(a.status)) bad(a.file, `Bad status "${a.status}"`);
  if (a.status === "Retired") continue;
  if (!KINDS.includes(a.kind)) warn(a.file, `kind "${a.kind}" isn't one of ${KINDS.join(", ")}`);
  if (a.pos !== null && a.pos !== undefined && !(typeof a.pos === "object" && a.pos.x >= 0 && a.pos.x <= 1 && a.pos.y >= 0 && a.pos.y <= 1)) warn(a.file, "pos must be null or {x: 0..1, y: 0..1} inside the grid");
  const rated = a.aiImpact || a.aiConfidence || a.aiReason;
  if (rated) {
    const ids = (a.aiEvidence || []).filter(Boolean);
    if (!ids.length) note(a.file, "AI rating lists no evidence. That's allowed, but it must say so: the app shows it as a guess.");
    const missing = ids.filter(id => !byId(evidence, id)); if (missing.length) bad(a.file, "aiEvidence cites quotes that don't exist: " + missing.join(", "));
    for (const k of ["aiImpact","aiConfidence"]) if (a[k] !== "" && !(Number(a[k]) >= 1 && Number(a[k]) <= 5)) bad(a.file, `${k} must be 1 to 5`);
    if (!a.aiReason) warn(a.file, "AI rating has no aiReason");
    if (!a.aiAgainst) warn(a.file, "AI rating has no aiAgainst: say the strongest case this is wrong, or that nothing has tested it yet.");
    if (!a.aiWouldChange) note(a.file, "AI rating has no aiWouldChange: say what evidence would move it.");
  }
}
for (const p of places) {
  if (p._unreadable || !p.id) continue;
  if (!["Candidate","Confirmed","Rejected"].includes(p.status)) bad(p.file, `Bad status "${p.status}"`);
  if (p.status === "Rejected") continue;
  if (!p.name) bad(p.file, "Place has no name");
  if (!PLACE_KINDS.includes(p.kind)) warn(p.file, `kind "${p.kind}" isn't one of ${PLACE_KINDS.join(", ")}`);
  const ids = (p.evidenceIds || []).filter(Boolean); const missing = ids.filter(id => !byId(evidence, id));
  if (missing.length) bad(p.file, "evidenceIds cites quotes that don't exist: " + missing.join(", "));
  if (!ids.length) note(p.file, "Place lists no quote behind it. Allowed, but `why` must say it's a guess; the app stamps it as one.");
  if (!p.why) warn(p.file, "Place has no `why`: say which interview or quote it rests on, or that it's a guess.");
  if (p.url && !/^https?:\/\//.test(p.url)) warn(p.file, "url should be a full http(s) address you actually opened, or empty");
}
for (const l of leads) {
  if (l._unreadable || !l.id) continue;
  if (!["Candidate","Accepted","Dismissed"].includes(l.status)) bad(l.file, `Bad status "${l.status}" (Candidate, Accepted or Dismissed)`);
  if (l.status === "Dismissed") continue;
  if (!l.name && !l.role) bad(l.file, "Lead has no name and no role description");
  if (!l.why) warn(l.file, "Lead has no `why`: say which interview or quote it resembles, or that it's a guess from the segment description.");
  const ids = (l.evidenceIds || []).filter(Boolean); const missing = ids.filter(id => !byId(evidence, id));
  if (missing.length) bad(l.file, "evidenceIds cites quotes that don't exist: " + missing.join(", "));
  if (!ids.length) note(l.file, "Lead lists no quote behind it. Allowed, but `why` must say it's a guess; the app stamps it as one.");
  if (l.url && !/^https?:\/\//.test(l.url)) warn(l.file, "url should be a full http(s) address you actually opened, or empty");
  if (l.name && !l.url) warn(l.file, "Lead has a name but no url. A name is only allowed when you saw it on a page you opened; otherwise give a role description.");
  if (l.customerId && !((compass.customers || []).some(c => c.id === l.customerId))) warn(l.file, `customerId ${l.customerId} isn't a segment in compass.json`);
  if (l.placeId && !byId(places, l.placeId)) warn(l.file, `placeId ${l.placeId} doesn't exist`);
}
/* The pivot gate, computed the way the app computes assumption status (CLAUDE.md, Poke holes): a pivot is in play only when every trigger is Shaky or Contradicted. */
const minN = Number(config.minInterviews ?? 5), strongShare = Number(config.strongShare ?? 0.5);
const confirmedPains = pains.filter(p => p.status === "Confirmed" && !p._unreadable);
const weak = iv => !iv || Number(iv.leading) > 0 || iv.pitched === "Yes" || iv.demoed === "Yes" || iv.source === "Friend or family" || iv.recentInstance === "No";
const share = ps => { const top = ps.filter(p => ["Hair on Fire","Incremental Improvement"].includes(p.tier)); const w = top.filter(p => weak(byId(interviews, p.interviewId))).length; return {n:ps.length, s:ps.length ? top.length / ps.length : 0, clean:ps.length ? (top.length - w) / ps.length : 0}; };
function triggerState(a) {
  if (a.kind === "problem" && a.problemId) {
    const r = share(confirmedPains.filter(p => p.problemId === a.problemId));
    if (r.n < minN) return {open:false, why:`${r.n} of ${minN} confirmed scores`};
    if (r.s >= strongShare && r.clean >= strongShare) return {open:false, why:`holding up, ${Math.round(r.s*100)}% show real pain`};
    return {open:true};
  }
  if ((a.kind === "early-adopters" || a.kind === "customers") && a.customerId) {
    const seg = id => confirmedPains.filter(p => { const iv = byId(interviews, p.interviewId); return iv && iv.customerId === id; });
    const r = share(seg(a.customerId));
    if (r.n < 3) return {open:false, why:`${r.n} of 3 confirmed scores from this segment`};
    if (a.kind === "early-adopters") { const others = (compass.customers || []).filter(c => c.id !== a.customerId).map(c => share(seg(c.id))).filter(o => o.n >= 3); if (others.some(o => o.s >= r.s + 0.25)) return {open:true}; }
    if (r.s >= strongShare && r.clean >= strongShare) return {open:false, why:`holding up, ${Math.round(r.s*100)}% of this segment's scores show real pain`};
    return {open:true};
  }
  const ev = (a.evidence || []).map(x => ({...x, e:byId(evidence, x.id)})).filter(x => x.e && x.e.status === "Confirmed");
  const sup = ev.filter(x => x.stance === "supports").length, con = ev.filter(x => x.stance === "contradicts").length;
  if (!ev.length) return {open:false, why:"no confirmed quotes tagged for or against it"};
  if (con >= sup) return {open:true};
  if (sup >= 3 && sup >= 2 * con) return {open:false, why:`holding up, ${sup} quotes for and ${con} against`};
  return {open:true};
}
for (const pv of pivots) {
  if (pv._unreadable || !pv.id) continue;
  if (!["Candidate","Active","Retired"].includes(pv.status)) bad(pv.file, `Bad status "${pv.status}" (Candidate, Active or Retired)`);
  if (pv.status === "Retired") continue;
  if (!PIVOT_KINDS.includes(pv.kind)) warn(pv.file, `kind "${pv.kind}" isn't one of ${PIVOT_KINDS.join(", ")}`);
  if (!(pv.text || "").trim()) bad(pv.file, "Pivot has no text");
  const trig = (pv.triggerAssumptionIds || []).filter(Boolean);
  if (!trig.length) bad(pv.file, "Pivot names no trigger assumption (triggerAssumptionIds)");
  for (const id of trig) { const a = byId(assumptions, id); if (!a) bad(pv.file, `Trigger ${id} doesn't exist`); else if (a.status === "Retired") warn(pv.file, `Trigger ${id} is retired`); else { const g = triggerState(a); if (!g.open) warn(pv.file, `Trigger ${id} doesn't meet the gate yet (${g.why}). Don't propose a pivot until the evidence turns; say "no pivot signal yet" in the note instead.`); } }
  const ids = (pv.evidenceIds || []).filter(Boolean); const found = ids.map(id => byId(evidence, id)); const missing = ids.filter((id, i) => !found[i]);
  if (missing.length) bad(pv.file, "evidenceIds cites quotes that don't exist: " + missing.join(", "));
  if (!ids.length) warn(pv.file, "Pivot cites no quotes. A pivot with no quotes behind it is a guess; say so in why.");
  else if (found.filter(Boolean).length && found.filter(Boolean).every(e => e.type === "Opinion or future intent")) warn(pv.file, "Every quote behind this pivot is opinion or future intent. Never propose a pivot from opinion alone.");
  if (!pv.why) warn(pv.file, "Pivot has no `why`: say which quotes point to this move, or that it's a guess.");
}
for (const iv of interviews) { if (iv._unreadable || !iv.id) continue; if (!transcripts[iv.id]) warn(iv.file, "No transcript saved"); if (iv.rubricRun && !["Yes","No"].includes(iv.recentInstance)) warn(iv.file, "Reviewed but recentInstance isn't Yes or No"); if (iv.placeId && !byId(places, iv.placeId)) warn(iv.file, `placeId ${iv.placeId} doesn't exist`); }
/* Notes: no verdict words, and every note says what would overturn it. */
const ndir = path.join(root, "notes"); if (fs.existsSync(ndir)) for (const f of fs.readdirSync(ndir)) if (f.endsWith(".md")) {
  const t = fs.readFileSync(path.join(ndir, f), "utf8"); const m = t.match(/\b(validated|proven|strong signal)\b/gi);
  if (m) warn("notes/" + f, `Uses ${[...new Set(m.map(x => x.toLowerCase()))].map(x => `"${x}"`).join(", ")}. Say what the evidence shows instead.`);
  if (!/what would make this wrong/i.test(t)) note("notes/" + f, "No 'What would make this wrong' section.");
}
const counts = {PROBLEM:0, warning:0, note:0}; for (const [s] of out) counts[s]++;
for (const [s, w, m] of out.sort((x, y) => ["PROBLEM","warning","note"].indexOf(x[0]) - ["PROBLEM","warning","note"].indexOf(y[0]))) console.log(`${s.padEnd(8)} ${w}: ${m}`);
console.log(`\n${counts.PROBLEM} problem(s), ${counts.warning} warning(s), ${counts.note} note(s). ${interviews.length} interviews, ${evidence.length} quotes, ${pains.length} pain scores, ${assumptions.length} assumptions, ${places.length} places, ${leads.length} leads, ${pivots.length} pivots.`);
process.exit(counts.PROBLEM ? 1 : 0);
