import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './sanity/schemaTypes'

const SINGLETON_TYPES = ['navbar', 'footer'] as const

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',
  auth: {
    loginMethod: 'dual',
    redirectOnSingle: true,
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio CMS')
          .items([
            S.divider().title('Frontend'),
            S.documentTypeListItem('page').title('Pages'),
            S.divider().title('Navigation'),
            S.listItem()
              .title('Navbar')
              .id('navbar')
              .child(S.document().schemaType('navbar').documentId('navbar')),
            S.listItem()
              .title('Footer')
              .id('footer')
              .child(S.document().schemaType('footer').documentId('footer')),

            S.divider().title('References'),

            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('commendation').title('Commendations'),
            S.documentTypeListItem('skill').title('Skills'),
            S.documentTypeListItem('certification').title('Certifications'),
            S.documentTypeListItem('careerEntry').title('Career History'),
            S.documentTypeListItem('technologyStack').title('Tech Stack'),
          ]),
    }),
    visionTool(),
    media(),
  ],

  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((t) => !SINGLETON_TYPES.includes(t.templateId as any))
        : prev,
    actions: (prev, { schemaType }) =>
      (SINGLETON_TYPES as readonly string[]).includes(schemaType)
        ? prev.filter(({ action }) =>
            ['publish', 'discardChanges', 'restore'].includes(action!)
          )
        : prev,
  },

  schema: {
    types: schemaTypes,
  },
})
