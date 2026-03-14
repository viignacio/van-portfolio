import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gw2ay2qy',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: false,
  },
})
