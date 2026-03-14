# Composable Architecture for Portfolio Website

This document explains the new composable architecture implemented for the portfolio website using Sanity CMS.

## Overview

The portfolio now uses a **Layout Block System** where each section (Hero, About, Skills, Projects, etc.) is defined as a configurable block in Sanity CMS. This allows for:

- **Dynamic content management** through Sanity Studio
- **Flexible section ordering** and activation/deactivation
- **Reusable components** that can be mixed and matched
- **Content updates** without code changes

## Architecture Components

### 1. Layout Blocks (`layoutBlock.ts`)
Each section is defined as a layout block with:
- **Block Type**: Identifies the section (hero, about, skills, etc.)
- **Order**: Controls the display sequence
- **Active Status**: Can be toggled on/off
- **Section Content**: Specific data for each section type

### 2. Section Schemas
Individual schemas for each section type:
- `heroSection.ts` - Hero section configuration
- `projectsSection.ts` - Projects section with layout options
- More section schemas can be added as needed

### 3. Page Schema (`page.ts`)
Pages contain an array of layout blocks, allowing for:
- Multiple page types
- Home page with specific configuration
- SEO metadata per page

### 4. Dynamic Layout Component (`DynamicLayout.tsx`)
Renders sections based on CMS data:
- Automatically orders blocks by their order field
- Only renders active blocks
- Maps each block type to its corresponding component

## How to Use

### 1. In Sanity Studio
1. Go to **Pages** → **Home Page**
2. Add layout blocks in the desired order
3. Configure each section's content
4. Toggle sections on/off as needed

### 2. Adding New Sections
1. Create a new section schema (e.g., `blogSection.ts`)
2. Add it to the `layoutBlock.ts` schema
3. Update the `DynamicLayout.tsx` component
4. Add the section type to the TypeScript interfaces

### 3. Content Updates
- **Text changes**: Edit directly in Sanity Studio
- **Section reordering**: Drag and drop blocks in the CMS
- **Adding/removing sections**: Toggle the "Active" field
- **Layout changes**: Modify section-specific options

## Benefits

1. **Content Management**: Non-technical users can update content
2. **Flexibility**: Easy to reorder, add, or remove sections
3. **Maintainability**: Centralized content management
4. **Scalability**: Easy to add new section types
5. **Performance**: Content is fetched dynamically and cached

## Current Section Types

- **Hero**: Main landing section with title, subtitle, and CTA
- **About**: Personal information and description
- **Skills**: Technical skills and expertise
- **Projects**: Portfolio projects with configurable layouts
- **Certifications**: Professional certifications
- **Commendations**: Testimonials and recommendations
- **Contact**: Contact form and information

## Future Enhancements

- **A/B Testing**: Multiple layout variations
- **Personalization**: User-specific content
- **Analytics**: Track section performance
- **Templates**: Pre-built layout configurations
- **Multi-language**: Internationalization support

## Development Notes

- All components maintain their existing props interface
- Fallback to hardcoded layout if CMS is unavailable
- TypeScript interfaces ensure type safety
- Responsive design is preserved across all sections
