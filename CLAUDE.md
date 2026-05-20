# Double Cut Studios — Claude Code Instructions

## Project Overview
This is the website for **Double Cut Studios**, a full-service creative production company offering event videography, VFX/CGI, drone/aerial, photography, and graphic design partnerships. The site should showcase work and generate client inquiries equally.

**Domain:** doublecutstudios.com
**Deployed to:** Cloudflare Pages via GitHub
**Stack:** Astro + Tailwind CSS

---

## Tech Stack & Conventions

### Framework
- **Astro** — static site with islands where interactivity is needed
- Use `.astro` components for all static/layout work
- Use React islands (`.tsx`) only for interactive components (contact form, video lightbox, mobile nav)
- Prefer `@astrojs/react` integration for islands

### Styling
- **Tailwind CSS** — utility-first, no separate CSS files unless unavoidable
- Use `@apply` sparingly — prefer inline Tailwind classes
- Use CSS custom properties (variables) for brand tokens (see Brand section below)
- Dark background by default (`#262626`), light sections use `#F7F7F7`

### File Structure
```
src/
  components/       # Reusable .astro components
  layouts/          # BaseLayout.astro (wraps every page)
  pages/            # index.astro, work.astro, contact.astro, etc.
  assets/           # Local images, logo SVGs
  styles/           # global.css for @font-face and CSS variables only
public/
  videos/           # Video files or embed placeholders
  images/           # Static public images
```

### Fonts
- Display/headings: bold, characterful — something with personality (not Inter, not Roboto)
- Body: clean, readable, modern
- Load via Google Fonts or self-hosted in `public/fonts/`

---

## Brand Identity

### Colors (CSS variables in global.css)
```css
:root {
  --color-primary: #149B9B;      /* Teal — primary brand */
  --color-accent-1: #E04560;     /* Coral/red — small accents ONLY: active nav, tags, icon highlights. Never as a full section bg */
  --color-accent-2: #EDAB8A;     /* Peach/apricot — warm CTA sections, large background use */
  --color-bg-light: #F7F7F7;     /* Off-white background */
  --color-bg-dark: #262626;      /* Near-black — default bg */
  --color-text-light: #F7F7F7;
  --color-text-dark: #262626;
}
```

### Visual Tone
- Warm, approachable, but modern — NOT corporate, NOT cold
- Inspired by: Defy Studios (structure/confidence) + Boring Friends (personality/warmth)
- Character and craft should feel hand-picked, not template-generated
- Film/cinema references are on-brand (the film strip logo is the anchor)

### Logo
- Film strip icon + "DOUBLE CUT STUDIOS" wordmark in bold caps
- Always use on dark backgrounds where possible
- SVG version should be in `src/assets/logo.svg`

---

## Site Structure

### Pages
1. **Home** (`/`) — Hero, Services preview (links to /services), Portfolio preview, Stats, Testimonials, CTA
2. **Work** (`/work`) — Full portfolio grid, filterable by category (Video, Aerial, CGI, Photo)
3. **Services** (`/services`) — Full-page deep dive, alternating layout sections for each service
4. **About** (`/about`) — Story, values, team
5. **Contact** (`/contact`) — Form + email/social links

### Navigation
- Logo left, nav links right: Work · Services · About · "Get in Touch" CTA button (no separate "Contact" link)
- Mobile: hamburger → full-screen overlay menu
- Sticky on scroll, transparent over hero → solid on scroll

---

## Key Components to Build

### `Hero.astro`
- Full-viewport, dark background
- Large headline (animated in)
- Subheadline: "Video. Aerial. CGI. Photography."
- Two CTAs: "See Our Work" + "Get in Touch"
- Background: looping video reel (muted, autoplay) OR dramatic still image with overlay until video assets are ready
- Scroll indicator

### `ServiceCard.astro`
- Icon or still frame + service title + one-line description + "Explore →" link
- Hover: subtle lift + teal accent reveal

### `PortfolioGrid.astro`
- Masonry or uniform grid
- Each item: thumbnail, title, category tag
- Click → lightbox or dedicated project page

### `ContactForm.tsx` (React island)
- Fields: Name, Email, Phone (optional), Service interest (dropdown), Message
- Client-side validation
- Submit to Netlify Forms or Formspree (add `netlify` attribute or action URL)

### `Stats.astro`
- Animated count-up numbers on scroll
- e.g. "150+ Events Filmed", "10+ Years Experience", "3 Countries"

---

## Content Placeholders
Until real assets are ready, use:
- **Images:** `https://picsum.photos/seed/[unique-seed]/1200/800` for stills
- **Videos:** YouTube or Vimeo embed placeholders with a `[VIDEO PLACEHOLDER]` comment
- **Copy:** Write compelling placeholder copy in the Double Cut Studios voice — warm, confident, specific. Not lorem ipsum.

---

## Deployment
- GitHub repo → Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

---

## Animations & Interactions
- Scroll animations via Intersection Observer in `src/scripts/animations.ts` — no external libraries
- Add `data-animate` to any element that should fade up on scroll; `data-animate="fade"` for no movement
- Hero elements use `data-animate-immediate` + `data-delay="0.15"` etc — fire on load, not scroll
- Staggered groups: `data-stagger` on container, `data-stagger-item` on each child
- **Always use `astro:page-load` event, NOT `DOMContentLoaded`** for script initialisation in BaseLayout
- Nav hover: underline slides in via `::before` pseudo-element
- Active nav: detected via `Astro.url.pathname`, styled with coral (`--color-accent-1`) underline
- Cursor glow: fixed radial gradient div that follows `mousemove` — in BaseLayout
- Marquee: `src/components/Marquee.astro` — continuous CSS animation ticker, used between homepage sections
- Grain: `.grain-overlay` class using `::after` pseudo-element — apply to all dark sections
- Always include `@media (prefers-reduced-motion: reduce)` override for all animations


- **Always** use Tailwind for styling — no inline `style=""` unless animating with JS
- **Never** install a UI component library (no shadcn, no DaisyUI) — build components from scratch
- **Prefer** Astro components over React unless interactivity is genuinely needed
- **Ask** before adding any new npm package — keep dependencies minimal
- **Commit-ready**: every task should result in clean, working code with no console errors
- **Mobile-first**: all layouts should work on 375px width before scaling up
- When in doubt about copy, write something real and on-brand — placeholder copy should sound like Double Cut Studios, not lorem ipsum

---

## Current Status
- [ ] Astro project initialized
- [ ] Tailwind configured
- [ ] Global CSS with brand tokens
- [ ] BaseLayout with Nav + Footer
- [ ] Home page scaffold
- [ ] Work page
- [ ] Contact page with form
- [ ] Deployed to Cloudflare Pages