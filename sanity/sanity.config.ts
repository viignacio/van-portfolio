import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const SINGLETON_TYPES = ['navbar', 'footer'] as const

export default defineConfig({
  name: 'default',
  title: 'van-portfolio',
  projectId: 'gw2ay2qy',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contents')
          .items([
            // Top: Pages
            S.documentTypeListItem('page').title('Pages'),

            S.divider(),

            // Root singletons
            S.listItem()
              .title('Navbar')
              .id('navbar')
              .child(S.document().schemaType('navbar').documentId('navbar')),
            S.listItem()
              .title('Footer')
              .id('footer')
              .child(S.document().schemaType('footer').documentId('footer')),

            S.divider(),

            // Other collections
            S.documentTypeListItem('project').title('Project'),
            S.documentTypeListItem('commendation').title('Commendation'),
            S.documentTypeListItem('skill').title('Skills'),
            S.documentTypeListItem('certification').title('Certifications'),
            S.documentTypeListItem('careerEntry').title('Career History'),
            S.documentTypeListItem('technologyStack').title('Technology Stack'),

            // IMPORTANT: no S.documentTypeListItems() here
          ]),
    }),
    visionTool(),
  ],

  // Keep Navbar/Footer as singletons
  document: {
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((t) => !SINGLETON_TYPES.includes(t.templateId as any))
        : prev,
    actions: (prev, {schemaType}) =>
      (SINGLETON_TYPES as readonly string[]).includes(schemaType)
        ? prev.filter(({action}) =>
            ['publish', 'discardChanges', 'restore'].includes(action!)
          )
        : prev,
  },

  schema: {
    types: schemaTypes,
  },
})
