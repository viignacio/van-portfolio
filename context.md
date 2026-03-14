# Portfolio Website - Context Summary

> **Critical Reference**: Use this when context window is exhausted. Update after major changes.

## Quick Facts

- **Project**: QA Automation Engineer Portfolio (Van Ian Ignacio)
- **Stack**: Next.js 15.3.2, React 19, TypeScript, Tailwind CSS, Sanity CMS
- **Status**: Deployed to Vercel, live with Sanity CMS
- **Architecture**: Composable Layout Block System (CMS-driven sections)

## Core Architecture

**Layout Block System**: All sections (Hero, About, Projects, etc.) are CMS blocks in Sanity. Homepage (`src/app/page.tsx`) fetches via `getHomePage()` query and renders blocks dynamically.

**Key Files**:
- `src/app/page.tsx` - Fetches CMS data, renders layout blocks
- `src/components/Layout.tsx` - Navbar + Footer wrapper
- `src/components/LayoutBlock.tsx` - Section wrapper
- `src/lib/sanity/queries.ts` - GROQ queries
- `sanity/schemaTypes/layoutBlock.ts` - Block schema definition

## Critical Rules

1. **NEVER hardcode content** - All content comes from Sanity CMS
2. **Content updates** happen in Sanity Studio (`/studio`), no code changes needed
3. **New sections**: Create schema → Add to `layoutBlock.ts` → Create component → Add to `page.tsx` render logic
4. **Styling**: Tailwind only, use `rounded-2xl` for cards, follow dark theme

## Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-22
EMAIL_USER=... (SendGrid)
EMAIL_PASSWORD=... (SendGrid)
EMAIL_FROM=...
EMAIL_TO=...
```

## Current Sections

**Implemented**: Hero, About, Projects  
**Schemas exist, components may be missing**: Skills, Certifications, Commendations, Contact

## Quick Commands

```bash
npm run dev          # Dev server (localhost:3000)
cd sanity && npm run dev  # Sanity Studio (localhost:3333)
npm run cypress:open # E2E tests
```

## Important Notes

- **Sanity CDN disabled in production** (CORS workaround)
- **Contact form**: `/api/contact/route.ts` uses nodemailer + SendGrid
- **Components pattern**: Accept CMS data props, use TypeScript interfaces
- **See**: `AboutSection.tsx` and `ProjectsSection.tsx` for component patterns

## Documentation

- `README.md` - Setup instructions
- `COMPOSABLE_ARCHITECTURE.md` - Architecture details
- `progress.md` - Task tracking

---

**Update this file after major architectural changes or when adding new patterns.**

