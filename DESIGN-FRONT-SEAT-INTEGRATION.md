# Front Seat design — integration assessment

**TL;DR:** Yes, it can be integrated well. Your current build is a solid base. The shift from “prove understanding to unlock” to “survive first, debrief after” is a clear design win and matches the schema you’ve outlined. Below is how it maps, what to reuse, and a suggested order of work.

---

## 1. Verdict: can it be integrated?

**Yes.** The architecture you described fits the existing codebase:

- You already have: **org context** (small/large), **skill bars** (same six skills), **scenario → feedback** loop, **save/load**, **choices log**, **report** (skills, choices, AT3 draft, reflection).
- You’re mainly **adding**: Hub, Intel Feed, second decision per episode, risk meter, evidence tokens, Debrief + Script Mode, EST Boss Mode — and **removing**: quiz-before-scenario gate.

So it’s an evolution, not a rewrite. The “80% there” estimate is fair; the remaining 20% is new UI states and data, not a new engine.

---

## 2. How your flow maps to the current build

| Your flow | Current build | Integration note |
|-----------|----------------|-------------------|
| **Landing → New / Resume** | `#start` + resume modal | Keep; add “New” = clear save and go to Onboarding. |
| **Onboarding: Identity + Contract** | Partly in welcome + org select | Add **Identity** (name/alias, role) and **Contract** screen (“4 disruptions + EST simulation”); move org (small/large) here. |
| **HQ / Hub** | Missing | **New screen.** Mission tiles for 4 megatrends; dashboard (skills, risk, org, evidence). Returns here after each episode. |
| **Episode: Intel Feed** | Missing | **New.** Replace “quiz” as the gate. Feed = messages/headlines/snippets (optional media). No quiz. |
| **Episode: Decision → Consequence** | `#scenario` → `#feedback` | **Reuse.** Extend to **two** decision points per episode (Decision 1 → Consequence 1 → Decision 2 → Consequence 2). |
| **Episode: Debrief** | Missing | **New.** After consequences: “What just happened?” — 3 panels (work env, types of employment, emerging/declining jobs). Syllabus framing revealed here. |
| **Episode: Manager Brief / Script Mode** | Current quiz content | **Move here.** Explain + Describe prompts *after* play; short, debrief tone; store script answers; optional feedback (cause/effect, feature count). |
| **Episode Summary** | Similar to current feedback | “What you changed / skills used / evidence collected” then **return to Hub**. |
| **EST Boss Mode** | Missing | **New.** Unlocks when all 4 episodes done. Difficulty (Practice / Standard / Exam), question set, submit → auto-feedback, save attempts. |
| **Final Report + Export** | `#summary` + `#report` | **Extend.** Add timeline, evidence summary, “exam-ready answers” bank, keep AT3 draft and reflection. |

So: **reuse** start/resume, org context, scenario/feedback UI and logic, skills, save/load, report shell. **Add** Hub, Intel Feed, second decision, Debrief, Script Mode, Boss Mode, risk + evidence. **Remove** quiz-as-gate (keep quiz *content* for Script Mode and Boss).

---

## 3. What integrates cleanly

- **Skills:** Same six (Comm, Teamwork, DL, PS, CT, TM). Current 0–20 scale can become 0–100 for unlock thresholds (e.g. comm ≥ 40 → “mediate meeting”).
- **Org context:** Already in state and in content branching; Hub just displays it and passes it into episodes.
- **Megatrend order:** You already have `MEGATREND_ORDER` and per-megatrend scenario indices; episodes are “mission 1..4” with optional linear or open order.
- **Choices and consequences:** Current `SCENARIOS` structure (choices, skillPoints, consequence, tradeOff, flags) fits; extend with `riskDelta`, `evidenceDrops`, and optional second decision per episode.
- **Save schema:** Your proposed `saveState` is a superset of what you have; current fields can be renamed or nested under `progress`, `player`, etc., without breaking existing behaviour if you migrate gradually.

---

## 4. What needs new work (and how hard)

| Piece | Effort | Notes |
|-------|--------|--------|
| **HQ Hub** | Medium | New screen + mission tiles (4) + dashboard (skills, risk, org, evidence). Reuse existing dashboard component for skills; add risk meter and evidence list. |
| **Intel Feed** | Medium | New screen or panel: 4–6 items (message, email, headline, etc.). Can be static content per megatrend at first; “attention path” is optional. |
| **Two decisions per episode** | Medium | Data: each episode has two scenario “nodes” (Decision 1 → Consequence 1 → Decision 2 → Consequence 2). Current one-decision flow is the template; duplicate pattern and add `currentNode` to progress. |
| **Risk meter** | Low | Single 0–100 value; thresholds (promotion / stable / at risk). Display in Hub and update from `riskDelta` on choices. |
| **Evidence tokens** | Medium | New list in state; each consequence can append items (type, text, episodeId). Hub shows “inventory”; Script Mode can offer “click to insert” or drag. |
| **Skill-gated choices** | Low | Each choice already has skill tags; add `requiredSkill: { communication: 40 }` (or similar). In render, hide or disable choices whose requirements aren’t met. |
| **Debrief (3 panels)** | Low | Static or dynamic content per megatrend (work env, employment types, jobs). Three expand/collapse or tabbed panels; no new data model. |
| **Script Mode** | Medium | Explain + Describe prompts per episode; text areas; store in `scriptAnswers`. Feedback (cause/effect, feature count) can be simple rules or checklist. |
| **EST Boss Mode** | High | New flow: lobby (difficulty) → question set (pull from episodes) → submit → auto-feedback screen → save attempts. Depends on having a clear “EST script” (question bank + mark scheme). |
| **Report extensions** | Low | Timeline (from choices log), evidence summary, exam-ready answers (from Boss + Script). Current report already has skills and choices; add sections. |

So: Hub, Intel Feed, and two-decision structure are the main structural changes; Boss Mode is the largest new feature. The rest are extensions of existing state and UI.

---

## 5. Suggested integration order (phased)

So that the game always runs and you can test as you go:

1. **Remove quiz gate, add Intel Feed (simplified)**  
   - After welcome/onboarding, go to **Intel Feed** for current megatrend (one screen of 4–6 items), then straight to **Decision 1** (current scenario).  
   - No quiz; no “prove understanding to unlock.”  
   - Keeps: one decision per megatrend, current feedback, return to “next” step (later that becomes Hub).

2. **Add Hub**  
   - After onboarding, go to Hub. Hub shows 4 mission tiles and “Player Dashboard” (skills, org).  
   - Completing an episode = Intel → Decision → Consequence → back to Hub.  
   - Still one decision per episode; no risk meter or evidence yet.

3. **Add second decision + risk + evidence**  
   - Each episode: Intel → Decision 1 → Consequence 1 → Decision 2 → Consequence 2.  
   - Consequence objects get `riskDelta` and `evidenceDrops`.  
   - State: `risk` (0–100), `evidence[]`.  
   - Hub shows risk meter and evidence list.

4. **Add Debrief + Script Mode**  
   - After Consequence 2: Debrief (3 panels), then Manager Brief (Explain + Describe).  
   - Save script answers; optional simple feedback.  
   - Episode summary then return to Hub.

5. **Skill-gated choices**  
   - Add `requiredSkill` to choices; hide or grey out if below threshold.  
   - Scale skills to 0–100 if you haven’t already.

6. **EST Boss Mode + report extensions**  
   - Unlock when all 4 episodes complete.  
   - Boss lobby (difficulty) → questions → submit → feedback.  
   - Report: timeline, evidence, exam-ready answers.

This order gets “survive first, debrief after” and stakes (risk, evidence) in place before layering Boss Mode and full report.

---

## 6. Schema alignment

Your proposed save schema fits. Minimal extension of what you already persist:

- **player:** `{ name, role, orgContext }` — you have `orgContext`; add name/role in Onboarding.
- **progress:** `completedEpisodes`, `currentEpisode`, `currentNode` — you have `megatrendOrderIndex`, `currentIndex`; can add `completedEpisodes` (list) and `currentNode` (for two-step episode).
- **skills:** already have `skillScores`; can rescale to 0–100 and rename in serialisation.
- **risk:** new number, 0–100.
- **flags:** can be derived from choices or stored explicitly if you use them for branching.
- **evidence:** new array `{ id, type, text, episodeId }`.
- **choicesLog:** you have `choicesByMegatrend`; can formalise as list of `{ episodeId, nodeId, choiceId, delta, flags }`.
- **scriptAnswers / estBoss:** new; no conflict with current save.

So: **yes, it can be integrated well.** The main work is new screens (Hub, Intel, Debrief, Script, Boss) and extending the episode to two decisions and to Debrief + Script. The “make choices matter, make skills unlock options, make consequences visible, make assessment a debrief” direction is well served by this plan. When you upload more (EST script, sample intel content, or wireframes), we can map them straight onto this flow and into the existing `game.js` / `index.html` structure.
