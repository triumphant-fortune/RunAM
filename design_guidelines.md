# RunAm Landing Page Design Guidelines

## Design Approach

**Reference-Based Approach**: Draw inspiration from modern fintech and marketplace platforms (Airbnb for trust elements, Stripe for clean layouts, TransferWise for process clarity). The design emphasizes trust, security, and simplicity - critical for peer-to-peer marketplace adoption in Nigeria.

## Core Design Principles

1. **Trust-First Design**: Every section reinforces safety and verification
2. **Clear Value Proposition**: Distinct messaging for both user personas (senders and travelers)
3. **Process Transparency**: Visual step-by-step journey mapping
4. **Mobile-First Responsive**: Nigerian users primarily access via mobile devices

## Color System

**Brand Colors** (User-Specified):
- Primary Green: #2D8A54 (CTAs, accents, trust indicators)
- Brand Yellow: #FFD700 (RunAm branding, highlights)
- Navy/Dark: #1A2332 (footer, text hierarchy)
- Neutrals: White, cream (#F9F9F9), light gray (#F3F4F6) for backgrounds
- Text: Dark navy for headings, gray (#6B7280) for body text

## Typography System

**Font Families**: 
- Primary: Inter or similar modern sans-serif for UI elements
- Display: Bold weight for hero "RunAM" text
- Body: Regular (400) and Medium (500) weights

**Hierarchy**:
- Hero Display: 72-96px bold (mobile: 48-56px)
- H1 Section Headings: 48-56px bold (mobile: 32-40px)
- H2 Subheadings: 20-24px regular (mobile: 16-18px)
- Body Text: 16-18px regular (mobile: 14-16px)
- Card Text: 14-16px regular
- Button Text: 16px medium, uppercase spacing

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 consistently
- Section vertical padding: py-16 to py-24 (mobile: py-12)
- Container max-width: max-w-7xl with px-6 to px-8
- Card padding: p-6 to p-8
- Gap between elements: gap-8 to gap-12

**Grid System**:
- How It Works: 4-column grid (lg:grid-cols-4, md:grid-cols-2, mobile: single column)
- Why Choose RunAm: 3-column grid (lg:grid-cols-3, md:grid-cols-2, mobile: single column)
- For Senders/Travelers: 2-column split (lg:grid-cols-2, mobile: stack)

## Component Library

### Navigation Bar
- Fixed position with subtle shadow on scroll
- Logo left-aligned (height: h-8 to h-10)
- Center navigation links with hover underline effect
- Right-aligned: "Sign In" text link + "Get Started" button (primary green, rounded-lg, px-6 py-3)
- Mobile: Hamburger menu, slide-in drawer

### Hero Section
- **Large hero image**: Highway/road background image covering full viewport height (min-h-screen)
- Dark overlay (opacity-50) for text readability
- Content centered vertically and horizontally
- Yellow "RunAM" logo/text as primary visual (text-8xl to text-9xl)
- Tagline: text-2xl to text-3xl, white text, mb-4
- Subtext: text-lg to text-xl, white/gray-100, max-w-3xl center-aligned
- Dual CTA buttons: "For Senders" and "For Travelers" (white background with green text + green solid)

### How It Works Section
- White/cream background
- Section heading centered with green accent underline
- 4-card grid with icons above text
- Each card: white background, rounded-xl, p-6, subtle shadow on hover
- Icon: circular background (green with opacity-10), size: h-16 w-16
- Card number badge: green circle with white number
- Title: font-semibold, text-xl
- Description: text-gray-600, leading-relaxed

### Why Choose RunAm Section
- Light gray background (#F9F9F9)
- 6-card grid (3 columns desktop, 2 tablet, 1 mobile)
- Cards with illustrations/icons centered
- Card styling: white background, p-8, rounded-2xl, border-2 border-transparent, hover:border-green
- Icon/illustration: mb-6, height proportional to card
- Feature title: font-bold, text-lg, mb-3
- Description: text-gray-600, text-center

### For Senders/For Travelers Sections
- Alternating layout: image left/text right, then text left/image right
- 50/50 split on desktop (grid-cols-2)
- Image: rounded-2xl, object-cover, aspect-square to aspect-video
- Content area: p-8 to p-12
- Section heading: text-4xl, font-bold, mb-4
- Subheading: text-xl, text-gray-600, mb-8
- Feature list: checkmark icons (green), text-lg, gap-4
- Professional lifestyle images showing package handling and travelers

### CTA Section
- Full-width green background (#2D8A54)
- White text, py-20
- Centered content, max-w-4xl
- Heading: text-5xl, font-bold, mb-4
- Subtext: text-xl, mb-8
- Email input + button combo: flex layout, max-w-2xl center
- Input: white background, rounded-l-lg, px-6 py-4, placeholder gray
- Button: rounded-r-lg, px-8 py-4, yellow background with dark text
- 3-feature cards below: grid-cols-3, white background, rounded-xl, p-6, icon + text

### Footer
- Dark navy background (#1A2332)
- 4-column grid (responsive: 2 cols tablet, 1 col mobile)
- White text with gray-400 links
- Column 1: Logo + tagline + social icons (circular, hover:bg-green)
- Columns 2-4: Link groups with headings (text-sm uppercase, tracking-wide, mb-4)
- Links: hover:text-green transition
- Bottom bar: border-top, py-6, flex justify-between (copyright left, links right)

## Images

**Required Images** (High quality, professional photography):

1. **Hero Background**: 
   - Wide highway/road image showing movement and journey
   - Sunset or well-lit highway perspective
   - Resolution: 1920x1080 minimum
   - Placement: Full viewport background with dark overlay

2. **For Senders Section**:
   - Professional image of person holding/sending package
   - Clean background, well-lit
   - Aspect ratio: 4:3 or 1:1
   - Placement: Left side of section

3. **For Travelers Section**:
   - Image of traveler with backpack/luggage, confident pose
   - Airport or travel context preferred
   - Aspect ratio: 4:3 or 1:1
   - Placement: Right side of section

4. **Why Choose RunAm Icons**:
   - Simple line icons or illustrations for: ID verification, secure payment, GPS tracking, support headset, star rating, shield/insurance
   - Style: Outline icons with green accent color
   - Size: 64x64px to 96x96px

5. **How It Works Icons**:
   - Package box, people matching, handshake, tracking map
   - Style: Filled icons with green primary color
   - Size: 48x48px to 64x64px

## Responsive Breakpoints

- Mobile: < 768px (single column layouts, stacked elements)
- Tablet: 768px - 1024px (2-column grids, reduced spacing)
- Desktop: > 1024px (full multi-column layouts as designed)

## Interactions & Polish

- Smooth scroll behavior between sections
- Subtle scale transform on card hover (scale-105)
- Button hover: brightness adjustment, subtle lift (shadow-lg)
- Link hover: color change to green with smooth transition
- Lazy load images below fold
- Intersection observer for fade-in animations on scroll (optional enhancement)

## Critical Implementation Notes

1. **Pixel-Perfect Fidelity**: Match Figma spacing, sizing, and alignment exactly
2. **Content Integrity**: Use exact copy provided - no paraphrasing
3. **Color Consistency**: Use specified hex codes throughout
4. **Mobile Optimization**: Ensure touch-friendly tap targets (min 44x44px)
5. **Performance**: Optimize images (WebP format), lazy loading below fold
6. **Accessibility**: Proper heading hierarchy, alt text for images, sufficient color contrast