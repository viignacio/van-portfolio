# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Owner**: Van Ian Ignacio (QA Automation Engineer)
**Stack**: Next.js 16 App Router · React 19 · TypeScript 5 · Tailwind CSS 4 · Sanity CMS v5
**Deployed**: Vercel (auto-deploy on push to `main`)

## Commands

```bash
npm run dev     # Dev server on localhost:3000 — Sanity Studio available at /studio
npm run build   # Production build
npm run lint    # ESLint
npm run sanity  # Sanity CLI
```

> `npm run dev` uses `--webpack` flag (not Turbopack).

## Architecture

All homepage sections are CMS-driven via a **Composable Layout Block System**. Content flows:

```
Sanity CMS → getHomePage() GROQ query → app/page.tsx → rendered components
```

No `src/` folder — all source lives at root level:

```
app/               — Next.js App Router (pages, API routes, studio embed)
components/        — React components (Backgrounds/, icons/technologies/)
hooks/             — useMouseGlow, useIsDesktop, useSwipe
lib/sanity/        — Sanity client, GROQ queries, image URL builder
lib/cms/types/     — TypeScript interfaces for CMS data shapes
sanity/schemaTypes/ — Sanity schema definitions
```

### Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Fetches CMS data via `getHomePage()`, renders layout blocks |
| `lib/sanity/queries.ts` | All GROQ queries — add new queries here only |
| `lib/cms/types/` | TypeScript interfaces for CMS data — define one per section |
| `sanity/schemaTypes/layoutBlock.ts` | Master block schema — register new block types here |
| `components/Layout.tsx` | Navbar + Footer wrapper |
| `components/LayoutBlock.tsx` | Generic section wrapper |
| `components/Backgrounds/FaultyTerminal.tsx` | WebGL OGL terminal background |

### Adding a New Section (exact order)

1. Create schema → `sanity/schemaTypes/<name>.ts`
2. Register schema → `sanity/schemaTypes/index.ts`
3. Add block type → `sanity/schemaTypes/layoutBlock.ts`
4. Add TypeScript interface → `lib/cms/types/<name>.ts`
5. Update GROQ query → `lib/sanity/queries.ts`
6. Create React component → `components/<Name>.tsx`
7. Add render case → `app/page.tsx`

Reference implementations: `AboutSection.tsx`, `ProjectsSection.tsx`.

**Hook rule**: Never call hooks inside `.map()` loops — extract items into named sub-components.

## Core Rules

- **Never hardcode content** — all text, images, and data come from Sanity CMS as props.
- **GROQ queries** belong only in `lib/sanity/queries.ts`, not inline in components.
- **Styling**: Tailwind CSS only. Dark theme. `rounded-2xl` for cards.
- **`styled-components`** is a required peer dep for `@sanity/ui` — do not remove.
- **Sanity CDN** is intentionally disabled (`useCdn: false`) in production to avoid CORS issues.
- **Git**: Always branch before committing — never commit directly to `main`. Stage specific files, not `git add -A`.

## Environment Variables (`.env.local`)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=gw2ay2qy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-22
SANITY_API_TOKEN=<sanity_token>
SANITY_REVALIDATE_SECRET=<webhook_secret>
```

## Detailed Rules

See `.claude/rules/` for extended documentation:

**Project-specific** (always loaded):
- `architecture.md` — composable layout system, section steps, key file map
- `content-management.md` — CMS rules, no-hardcoding policy
- `git-workflow.md` — branch, commit, and deploy rules
- `sanity-schema.md` — schema conventions, studio config
- `security.md` — secrets, input validation, API route protection
- `workflow.md` — quality checklist before completing any feature

**Stack conventions** (applied when relevant):
- `accessibility.md` — WCAG 2.2 standards for React components
- `nextjs-app-router.md` — Server/Client Component patterns, data fetching
- `react-components.md` — component structure, naming, hook rules
- `typescript.md` — strict typing, naming conventions
- `tailwind.md` — class ordering, responsive design, conditional classes

## Agents & Skills

Audit agents in `.claude/agents/` (invoke when asked for a review):
- `accessibility-audit.md` — WCAG 2.2 audit across all components
- `performance-audit.md` — bundle size, Core Web Vitals, Next.js optimizations
- `security-review.md` — vulnerability scan for a given scope or PR

Supporting checklists in `.claude/skills/`:
- `accessibility-audit/SKILL.md`
- `performance-audit/SKILL.md`
- `security-review/SKILL.md`
- `test-generator/SKILL.md` — unit test generation (includes setup guide; no test runner installed yet)

**Keep rules current**: whenever a change affects a documented pattern, update the relevant rule file in the same task. Also update `.claude/context.md` after major architectural changes.
