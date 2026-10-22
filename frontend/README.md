# Purva Ocean Adventures — frontend recreation

A pixel-faithful recreation of the supplied **Purva Ocean Adventures** mockup, plus a
cinematic scroll-motion system, built as a production-quality React frontend.

```
React 18 · TypeScript · Vite · Tailwind CSS · GSAP + ScrollTrigger · Motion for React · Lucide
```

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

---

## What was built

### 1. Visual recreation (source of truth = the mockup)

- Asymmetrical 3-column editorial grid that closes exactly like the reference
  (`hero + host + quote/gallery` → `featured + destinations` → `experiences + benefits + testimonials`).
- Warm ivory canvas (`#F5F0E7`), cream panels, midnight navy, 8px gutters, hairline gutters only.
- Self-hosted typography (no external font CDN — the preview sandbox has no network):
  **Cormorant Garamond** (editorial serif), **Inter** (UI), **La Belle Aurore** (host signature).
- All photography is real underwater/tropical stock, downloaded locally into `public/images`
  and re-compressed (Pexels licence, credited in the footer).
- Sections: slim sticky nav, cinematic whale-shark hero with 01–04 scene rail, Meet Your Host,
  ocean quote, gallery with filters, Maldives Maafushi expedition card with floating amenities
  panel, three experience cards, destinations banner, dark benefits panel, testimonials,
  and the floating phone mockup (desktop only, decorative, never intercepts pointers).

### 2. Motion system (one language: weightless, controlled, ocean)

| Layer | Technique | Where |
|---|---|---|
| Scroll-triggered reveals | GSAP `from()` + `ScrollTrigger` (`once: true`), grouped `[data-anim]` staggering via `useReveal()` | every section |
| Scroll-linked depth | `scrub` parallax (`useParallax`), hero image descends slower, destinations photo pushes 1.09 → 1.0 | hero, Maldives photo, quote, banner |
| Mask reveals | `clip-path` inset timelines (`useClipReveal`) — reserved for hero, trip photo, quote, banner | 4 places only |
| Opening sequence | GSAP timeline: nav → hero mask → eyebrow → line-by-line headline → copy → CTAs → rail → trust row (~1.5s) | hero |
| Interaction | Motion for React: nav underline (`layoutId`), gallery pill (`layoutId`), modals, testimonial slide, FAQ accordion, mobile menu | UI |
| Ambient | slow float on the phone mockup, cursor-responsive hero drift (pointer devices only) | hero, phone |

Everything respects `prefers-reduced-motion` (animations are skipped, not just shortened, so
nothing is left invisible), every `ScrollTrigger`/`gsap.context` is reverted on unmount, and
`ScrollTrigger.refresh()` is re-run after fonts/images settle.

### 3. Functionality (real, honest states)

- Header: smooth anchor nav, animated active underline driven by `IntersectionObserver`,
  mobile menu with scroll lock, Escape and close-on-navigate.
- **Watch Film** → accessible modal (focus trap, Escape, focus restore, scroll lock).
  **Integration point:** set `FILM_SRC` in `src/data/site.ts` → a real `<video>` player renders.
  While empty it shows a clearly labelled “film is on its way” state — no fake playback.
- **View Trip Details** → full trip modal (dates, inclusions, honest “dates are planned, not
  confirmed availability” note).
- Experience cards → per-card detail modal.
- Gallery → filter pills, prev/next paging, keyboard-accessible lightbox (←/→/Esc).
- Destinations CTA → newsletter modal with email validation, loading and error/success states.
- Enquiry form + FAQ accordion in the footer.
- Hairline scroll-progress indicator.
- **Integration points:** `INQUIRY_ENDPOINT` (or `VITE_INQUIRY_ENDPOINT`) — when set, both forms
  POST real JSON; when unset they say so explicitly instead of pretending an email was sent.
- Testimonials: only the genuine reference testimonial is published; the other slides explicitly
  invite real, authorised stories rather than inventing reviews or credentials.

### 4. Accessibility & performance

- Skip link, visible `:focus-visible` rings, labelled controls, `aria-selected`/`aria-expanded`,
  modal `aria-modal` + focus trap + restore, live-region form feedback.
- Transform/opacity-only animation, `loading="lazy"` + fixed aspect ratios below the fold,
  hero image preloaded, images re-encoded progressive JPEG.
- Verified: no horizontal overflow at 1920 / 1536 / 1280 / 1024 / 820 / 390, no console errors,
  reduced-motion build renders all 50 revealed elements visible.

### 5. Testing performed

Rendered and inspected in Chromium at 1536×1024 (plus 1920, 1280, 1024, 834, 390), with
slow/fast/reverse scrolling, refresh, anchor navigation, every modal, the lightbox, filters,
carousel, both forms and the reduced-motion browser mode. Screenshots were compared against the
supplied mockup and the grid, hero scale and image crops were corrected iteratively.

---

## Structure

```
src/
  App.tsx                 page composition (editorial grid areas)
  index.css               design tokens, grid shell, type/buttons, focus + reduced-motion
  lib/anim.ts             GSAP helpers: useReveal, useParallax, useClipReveal, refresh, active section
  data/site.ts            all copy + assets + integration points (FILM_SRC, INQUIRY_ENDPOINT)
  components/
    Header · Hero · HostCard · OceanQuote · Gallery · FeaturedExpedition · Experiences
    Destinations · Benefits · Testimonials · PhoneMockup · Footer · ScrollProgress
    modals/FilmModal · modals/TripModal · ui/Modal · ui/Button · ui/BrandMark
public/images             photography (local, optimised)
public/fonts              self-hosted woff2 subsets
```

> Reference content (dates, credentials, testimonial) is reproduced from the supplied design and is
> not a claim of live availability, booking, or third-party endorsement.
