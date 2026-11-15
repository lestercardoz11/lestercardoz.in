# lestercardoz.in

The portfolio of Lester Cardoz, senior software engineer in Berlin. One screen per section, a dock to move between them, and click-through steps instead of scrolling.

| Key | Route | What is there |
| --- | --- | --- |
| 1 | `/` | A sentence that finishes several different ways. Click the highlight to change it |
| 2 | `/work` | The work for the chosen version, as cards |
| | `/work/[slug]` | One project in three or four steps, each with an animated picture |
| 3 | `/skills` | Skill areas for the chosen version, strongest first, linked to the work that used them |
| 4 | `/about` | A clickable timeline, how Lester works, and credentials. `/about#how` opens the second tab |
| 5 | `/contact` | Copy the email, or send a message through the form |

The switch in the header chooses between two versions of the whole site, **Full stack** and **ServiceNow**. Each has its own home sentence, work, skills and accent colour. The choice is remembered, and a link can set it: `https://www.lestercardoz.in/?track=servicenow` opens the ServiceNow version, `?track=fullstack` the other. Opening a project from the other version switches to it.

Number keys 1 to 5 change section. Arrow keys move between steps in a project and between stops on the timeline. Escape leaves a project.

On a laptop or larger (1280 by 640 and up) no page scrolls. On a phone the same content stacks and scrolls a little.

## Run it

```bash
pnpm install
pnpm dev                       # http://localhost:3000
pnpm lint && pnpm build
pnpm start -p 3100             # then, in another terminal:
pnpm shots                     # screenshots and layout checks into .shots/
```

Environment variables, all optional:

- `NEXT_PUBLIC_SITE_URL` if the site is deployed anywhere other than `https://www.lestercardoz.in`. It feeds the sitemap, robots file and Open Graph URLs.
- `RESEND_API_KEY` to make the contact form send email. Without it the form says so and points to the email address.
- `CONTACT_TO` and `CONTACT_FROM` to change where the form delivers and what it sends as.

## Where things live

- `lib/content.ts` holds every word and number on the site. Edit this to change what the site says.
- `lib/site.ts` holds the navigation, the contact links and the site URL.
- `lib/track.ts` holds the full stack or ServiceNow choice.
- `components/Shell.tsx` is the header, the dock, the exit transition and the number keys.
- `components/case/Visuals.tsx` holds the animated pictures: the bill formats, the pipeline, the batch-write race, the resume extraction and the candidate matching.
- `app/globals.css` holds the design tokens and all styles, in page order.
- `CLAUDE.md` and `.claude/agents/` describe how the work is split between a product owner and UX, software and QA leads when building with Claude Code.

Built with Next.js 16, React 19 and GSAP 3, with plain CSS. Motion respects `prefers-reduced-motion`.

The earlier Teletext version of this site is on the `master` branch.
