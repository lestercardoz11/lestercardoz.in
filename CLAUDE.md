@AGENTS.md

# lestercardoz.in

Lester Cardoz's portfolio. One screen per section, a dock to move between them, and click-through steps instead of scrolling. Next.js 16, React 19 and GSAP 3. The styles are plain CSS in `app/globals.css`. There is no CSS framework.

## Product rules

- **Less scrolling, more clicks.** At 1280x640 and larger, no page scrolls. New content goes behind a tab, a step or a card, never further down the page.
- **Anyone can follow it.** Plain words. A recruiter with no engineering background should understand every screen.
- **One bold thing per screen.** Cobalt means "click here", yellow means "this matters". The cobalt panel is the only loud surface.
- **Motion answers a click.** Every animation uses GSAP through `lib/gsap.ts`, starts from the finished markup, and is skipped when `still()` is true (reduced motion).
- **Two versions, one switch.** The header switch chooses Full stack or ServiceNow for the whole site: the home sentence, the work, the skills, the contact form and the accent colour (cobalt or green). Never mix the two on one screen. Anything new that differs by audience is keyed by `Track` in `lib/content.ts` and read with `useTrack()`. A link ending in `?track=servicenow` or `?track=fullstack` opens that version.
- All copy lives in `lib/content.ts`. Components never hold facts about Lester.

## Copy rules (hard)

- No em dashes and no semicolons in anything a visitor reads.
- Use only facts already in `lib/content.ts`. Never invent a number, a client or a skill. If a fact is missing, ask Lester.
- ServiceNow clients are described by sector and never named.
- Team outcomes say "contributed to". Never claim RAG, vector search, agents or eval suites.
- Contact email is `lesterxcardoz@gmail.com`. No phone number, salary or visa type on the site.

## Where things live

| Path | What |
| --- | --- |
| `lib/content.ts` | Every word and number on the site |
| `lib/site.ts` | Navigation, contact links, site URL |
| `lib/gsap.ts` | GSAP setup and the shared helpers: `still()`, `typing()`, `rise()`, `useArrowKeys()`, `useResize()` |
| `lib/slugs.ts` | The list of project addresses, kept apart so `proxy.ts` stays small |
| `lib/track.ts` | `useTrack()` and `setTrack()`, the full stack or ServiceNow choice |
| `components/Shell.tsx` | Header with the version switch, dock, exit transition, keys 1 to 5 |
| `components/View.tsx` | Page entrance (`data-in`) |
| `components/Tabs.tsx` | The one segmented control |
| `components/case/` | Case study stepper and its animated pictures |
| `app/globals.css` | Tokens and all styles, in page order |
| `scripts/shots.mjs` | Headless screenshots and layout checks |

## Checks

```bash
pnpm lint && pnpm build        # must both pass before anything is called done
pnpm start -p 3100             # then, in another terminal:
pnpm shots                     # or: pnpm shots home case-race
```

`pnpm shots` prints one line per screen: `scroll` (must be 0 at laptop sizes), `sideways` (must be 0), `off` (elements hanging off the side), `small` (tap targets under 32px) and console errors. Verify against `pnpm build && pnpm start`. File watching in `pnpm dev` is unreliable in this OneDrive folder, so a dev server can serve stale CSS.

## The team

The main session is the **product owner**. It holds the brief, decides, and does small edits itself. It delegates only when a fresh pair of eyes or parallel work pays for the cold start.

| Agent | Model | Use it for | Do not use it for |
| --- | --- | --- | --- |
| `ux-lead` | opus | Design critique from screenshots, flow and copy clarity | Writing code |
| `software-lead` | sonnet | Scoped implementation, code review, Next.js questions | Design decisions |
| `qa-lead` | sonnet | Running checks, layout metrics, keyboard and reduced-motion passes | Fixing what it finds |
| `Explore` | haiku | "Where is X" searches across the repo | Anything that needs judgment |

## Token rules

1. **Do not delegate what fits in one edit.** A spawn costs more than reading two files.
2. **Brief by path, not by paste.** Give an agent file paths and a one-paragraph goal. Never paste file contents, the career document or screenshots into a prompt.
3. **`lib/content.ts` is the only source of facts.** No agent needs Lester's career document.
4. **Metrics before pixels.** Read the `pnpm shots` line first. Open a PNG only when the line is wrong or the task is visual, and then only the screens in question.
5. **Read narrowly.** Grep for the selector or symbol, then read that range. `app/globals.css` is long, and it is ordered by page, so search it.
6. **Reports are short.** Agents return at most 12 findings, one line each: `severity | file:line or screen | problem | fix`. No preamble, no praise, no restating the brief.
7. **Reviewers do not edit.** Findings go to the product owner, who batches them into one change. That avoids three agents re-reading the same files.
8. **Parallel only when independent.** Review agents run together in one message. Implementation is one agent at a time.
9. **Do not re-verify what a check already proved.** If `pnpm build` passed, nobody re-reads the types.
10. **Read the Next.js doc for the one API in question**, under `node_modules/next/dist/docs/`, not the whole guide.
