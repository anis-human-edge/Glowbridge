# Glowbridge Project Rules & Boundaries

## 1. Domain & Strategy
- **Focus:** Skincare discovery, starting with high-growth Asian ecosystems (South Korea, China, Japan) to London.
- **Narrative:** "Discovery from high-growth Asian skincare ecosystems."
- **Wedge:** Emerging brands × Emerging creators. No random celebrities, no generic directories.
- **Tone:** Cinematic & cultural outside, disciplined & premium inside.

## 2. Aesthetics & Design System
- **Master Aesthetic:** Editorial Biotech Social
- **Palette:**
  - Ink: `#0C1016`
  - Deep Forest: `#20372D`
  - Stone: `#EDE9E1`
  - Warm Pearl: `#F8F5EF`
  - Luminous Moss: `#708B68`
  - Accent Clay: `#C46A3C`
  - Soft Gold: `#C7A84B`
- **Typography:**
  - Headings: `Plus Jakarta Sans`, `Inter`, `Sora`
  - Drama serif: `Cormorant Garamond Italic`, `Playfair Display Italic`
  - Data/Mono: `IBM Plex Mono`, `JetBrains Mono`
- **Surface System:** Rounded containers, subtle grain/noise, layered shadows (no flat cards), strong spacing, contrast-rich hierarchy.

## 3. Two UX Modes
- **Mode A (Public Cinematic):** Editorial beauty, scroll-triggered motion (GSAP), layered depth, premium transitions. Used for landing pages, For Brands/Creators.
- **Mode B (Premium Operational Dashboard):** Sharp, fast, clean, calm. No scrolling marketing gimmicks. Used for brand, creator, and admin dashboards.

## 4. Engineering & Tech Stack
- Frontend only at this stage (Supabase/Postgres backend structure mocked locally with Zustand).
- React 19, Vite, Tailwind CSS v3.4.17, React Router, GSAP 3 + ScrollTrigger, TanStack Query, Lucide React, Zustand.
- Do not use generic SaaS templates. Everything must have a bespoke feel.
- Component architecture must support distinct Roles: Brand, Creator, Host, Admin, User.
