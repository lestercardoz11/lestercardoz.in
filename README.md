# LESTERFAX

The portfolio of Lester Cardoz, built as a Teletext service. Every section is a numbered page, every career chapter is a subpage, and the O in CARDOZ is a football you can keep up.

| Page | Route | What is there |
| --- | --- | --- |
| 100 | `/` | Kick-off: the name, the ball and the index |
| 200 | `/full-stack` | The full-stack career, six chapters |
| 300 | `/servicenow` | The ServiceNow career, seven chapters |
| 400 | `/squad` | Skills as two starting elevens |
| 500 | `/honours` | Results, degrees and certifications |
| 600 | `/dressing-room` | How Lester works, and the football |
| 700 | `/transfer` | Contact and the offer builder |

Type any three-digit page number on a keyboard to jump to it. Arrow keys move between chapters, and chapters deep-link with a hash, for example `/full-stack#opex-genie`.

The site never scrolls on a laptop or larger. Screens above 1600 by 960 zoom the whole set up (see `--z` in `app/layout.tsx`), so 4K shows the same page, bigger. Honours, the dressing room and the transfer desk are one spread on a big screen and become numbered subpages (`components/shell/Subpages.tsx`) when the spread no longer fits; each page sets that breakpoint in `app/styles/pages.css`.

## Run it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

Set `NEXT_PUBLIC_SITE_URL` if the site is deployed anywhere other than `https://www.lestercardoz.in`. It feeds the sitemap, robots file and Open Graph URLs.

## Where things live

- `lib/content/` holds all the copy: chapters, the squad and the honours. Edit these to change what the site says.
- `lib/pages.ts` is the page registry, the contact details and the site URL.
- `components/hero/PixelBall.tsx` draws the football per pixel and runs the keepy-uppy physics.
- `components/story/` is the chapter engine and one visual per chapter.
- `components/ui/DitherImage.tsx` dithers the archival photographs into the page colours.

Built with Next.js 16, React 19, GSAP 3 and Tailwind 4. Motion respects `prefers-reduced-motion`.

## Pictures

The pictures in `public/pictures/` are AI-generated (Pollinations) and dithered into the page colours at runtime by `components/ui/DitherImage.tsx`. The Memoji is Lester's own. Swap any of them for your own generated images by replacing the file with the same name.
