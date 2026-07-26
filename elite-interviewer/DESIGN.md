---
name: Executive Presence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#2b6954'
  on-secondary: '#ffffff'
  secondary-container: '#adedd3'
  on-secondary-container: '#306d58'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#b0f0d6'
  secondary-fixed-dim: '#95d3ba'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#0b513d'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 30px
    fontWeight: '500'
    lineHeight: 38px
  headline-sm:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 96px
---

## Brand & Style

The design system is built for a high-stakes, premium AI Mock Interview platform. The brand personality is authoritative yet supportive, mimicking the experience of high-level executive coaching. The target audience consists of ambitious professionals and C-suite candidates who value discretion, precision, and excellence.

The design style is **Sophisticated Corporate Minimalism**. It eschews common "tech-bro" AI tropes (vibrant blurs and neon gradients) in favor of a "Physical Office" aesthetic: structured, layered, and quiet. The emotional response should be one of calm confidence and focus. High-contrast layering, generous whitespace, and impeccable typographic hierarchy create a sense of "expensive" utility where every pixel serves a purpose.

## Colors

The palette is rooted in archival tones and high-contrast neutrals to evoke a premium, editorial feel.

- **Primary (Deep Slate):** Used for primary text and structural grounding. It is a deep, near-black charcoal that feels more sophisticated than pure black.
- **Secondary (Emerald Green):** A rich, jewel-toned accent used sparingly for success states, primary actions, and "AI Active" indicators. It suggests growth and prestige.
- **Tertiary (Snow):** A very light off-white used for backgrounds to reduce eye strain while maintaining a crisp, paper-like quality.
- **Neutrals (Slate Grays):** Used for secondary text, hairline borders, and subtle UI metadata.

Color application should follow a 60-30-10 rule, where the Emerald Green is reserved strictly for high-priority focus points to maintain its impact.

## Typography

This design system employs a "New York Times meets Modern SaaS" typographic pairing. 

**Source Serif 4** is used for all headlines and editorial moments. Its sturdy, professional serifs provide an authoritative voice. **Geist** is used for all functional UI elements, data, and body copy; its technical precision ensures readability in dense interview feedback modules.

Scale headlines aggressively on desktop to create a sense of luxury. For body text, maintain a generous line height (1.5x - 1.6x) to ensure the interface feels "airy" and approachable despite the high-pressure subject matter of job interviews.

## Layout & Spacing

The layout philosophy is **Fixed-Fluid Hybrid**. Content is housed in a centered 1200px container on desktop to prevent eye fatigue across ultra-wide monitors. 

Spacing is intentionally oversized. Instead of the standard 16px or 32px gaps, this system uses 96px (section-gap) for major transitions to create a "Gallery" feel. Use a 12-column grid for dashboard views, with 24px gutters to allow the hairline borders of cards to breathe. 

On mobile, reduce horizontal margins to 20px but maintain vertical rhythm to ensure the premium feel persists on smaller screens.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** and **Micro-Shadows**. 

1.  **Level 0 (Background):** Solid `Tertiary` color.
2.  **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a 1px border in a very light Slate (#E2E8F0).
3.  **Level 2 (Active/Hover):** A subtle, diffused shadow (0px 4px 20px rgba(15, 23, 42, 0.05)) to suggest a slight lift.

Avoid heavy blurs. Shadows should be so subtle they are felt rather than seen. Use high-contrast transitions (e.g., a white card on a light-gray background) to define boundaries instead of shadows whenever possible.

## Shapes

The shape language is precise and architectural. A `Soft` (0.25rem/4px) base radius is used for all functional elements like buttons and input fields to maintain a professional edge. For larger containers (Cards, Modals), a maximum of 8px (`rounded-lg`) is permitted. 

Avoid circles and high-roundedness "pill" shapes, except for status indicators (Chips). The square-adjacent corners reflect the stability and seriousness of a corporate environment.

## Components

- **Buttons:** Primary buttons use the Emerald Green background with White text. Secondary buttons use a Slate-900 hairline border with no fill. All buttons should have a minimum height of 48px to feel substantial.
- **Inputs:** Use a "Minimalist Ledger" style. 1px Slate-200 border, no background fill (transparent), and Geist-Medium for the label. On focus, the border transitions to Slate-900, never the accent color, to maintain sophistication.
- **Cards:** White background, 1px hairline border, and 0px shadow by default. Use generous internal padding (32px) to frame content.
- **Lists:** Use 1px horizontal dividers between items. Avoid Zebra-striping; use white space to separate rows.
- **Chips/Badges:** Small, uppercase Geist labels with a very light Slate background. These are the only elements that can be fully rounded (pill-shaped) to distinguish them from actionable buttons.
- **Feedback Indicators:** Use the Emerald Green accent for "AI is Listening" or "Strength Identified" markers. Use a deep Oxblood Red (sparingly) for "Areas for Improvement."