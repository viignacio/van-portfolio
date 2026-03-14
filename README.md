# QA Automation Engineer Portfolio

A modern, responsive portfolio website showcasing QA automation expertise, built with Next.js, TypeScript, Tailwind CSS, and Sanity CMS.

## Features

- Modern, responsive design with dark mode
- Mobile-first approach
- Fast page loads with Next.js
- SEO optimized
- CMS-driven content via Sanity Studio
- E2E testing with Cypress
- Auto-deploy to Vercel on push to `main`

## Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/viignacio-iona/van-portfolio.git
   cd van-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables — create `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=<project_id>
   NEXT_PUBLIC_SANITY_DATASET=<dataset>
   NEXT_PUBLIC_SANITY_API_VERSION=<version>>
   SANITY_API_TOKEN=<sanity_token>
   EMAIL_USER=apikey
   EMAIL_PASSWORD=<sendgrid_api_key>
   EMAIL_FROM=<verified_sender>
   EMAIL_TO=<recipient>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

```bash
# E2E tests (interactive)
npm run cypress:open

# E2E tests (headless)
npm run test:e2e
```

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

The site deploys automatically to Vercel on every push to `main`. No manual steps required.

To deploy your own instance:

1. Import the repository in [Vercel](https://vercel.com)
2. Add the environment variables from `.env.local` to the Vercel project settings
3. Push to `main` to trigger a deployment

## Content Management

All content is managed through Sanity CMS. To update content:

1. Go to `/studio` on the running app
2. Edit content in Sanity Studio
3. Publish — changes reflect immediately in production

## License

MIT

## Contact

Van Ian Ignacio — [LinkedIn](https://www.linkedin.com/in/viignacio-ctfl/) — van.ignacio@ionacommerce.com
