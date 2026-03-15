import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'technologyStack',
  title: 'Technology Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Title for the technology stack section (e.g., "Tech Stack", "Technologies", "Skills")',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Technology Name',
              type: 'string',
              description: 'Name of the technology (e.g., "React", "Node.js", "TypeScript")',
              validation: (Rule) => Rule.required().max(50),
              options: {
                list: [
                  // Frontend
                  { title: 'React', value: 'react' },
                  { title: 'Vue.js', value: 'vue' },
                  { title: 'Angular', value: 'angular' },
                  { title: 'Next.js', value: 'nextjs' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'HTML5', value: 'html5' },
                  { title: 'CSS3', value: 'css3' },
                  { title: 'Tailwind CSS', value: 'tailwind' },
                  { title: 'Sass/SCSS', value: 'sass' },
                  
                  // Backend
                  { title: 'Node.js', value: 'nodejs' },
                  { title: 'Python', value: 'python' },
                  { title: 'Java', value: 'java' },
                  { title: 'C#', value: 'csharp' },
                  { title: 'PHP', value: 'php' },
                  { title: 'Express.js', value: 'express' },
                  { title: 'Django', value: 'django' },
                  { title: 'Spring', value: 'spring' },
                  { title: '.NET', value: 'dotnet' },
                  { title: 'Laravel', value: 'laravel' },
                  
                  // Database
                  { title: 'MongoDB', value: 'mongodb' },
                  { title: 'PostgreSQL', value: 'postgresql' },
                  { title: 'MySQL', value: 'mysql' },
                  { title: 'Redis', value: 'redis' },
                  { title: 'Firebase', value: 'firebase' },
                  { title: 'Snowflake', value: 'snowflake' },
                  { title: 'SQL', value: 'sql' },
                  
                  // DevOps & Tools
                  { title: 'Docker', value: 'docker' },
                  { title: 'Git', value: 'git' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'AWS', value: 'aws' },
                  { title: 'Azure', value: 'azure' },
                  { title: 'Jenkins', value: 'jenkins' },
                  { title: 'Kubernetes', value: 'kubernetes' },
                  { title: 'Vercel', value: 'vercel' },
                  { title: 'commercetools', value: 'commercetools' },
                  { title: 'Shopify', value: 'shopify' },
                  { title: 'Sanity', value: 'sanity' },
                  { title: 'Google Tag Manager', value: 'googletagmanager' },
                  { title: 'Figma', value: 'figma' },
                  { title: 'WebFlow', value: 'webflow' },
                  
                  // Testing
                  { title: 'Jest', value: 'jest' },
                  { title: 'Cypress', value: 'cypress' },
                  { title: 'Selenium', value: 'selenium' },
                  { title: 'Playwright', value: 'playwright' },
                  { title: 'RobotFramework', value: 'robotframework' },
                  { title: 'Cucumber', value: 'cucumber' },
                  { title: 'JMeter', value: 'jmeter' },
                  { title: 'Google Lighthouse', value: 'lighthouse' },
                  { title: 'WAVE', value: 'wave' },
                  { title: 'Axe DevTools', value: 'axedevtools' },
                  
                  // Other
                  { title: 'GraphQL', value: 'graphql' },
                  { title: 'REST API', value: 'rest' },
                  { title: 'Webpack', value: 'webpack' },
                  { title: 'Vite', value: 'vite' },
                  { title: 'NPM', value: 'npm' },
                  { title: 'Yarn', value: 'yarn' },
                ],
              },
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              description: 'Category to group technologies (e.g., "Frontend", "Backend", "Database", "DevOps")',
              options: {
                list: [
                  { title: 'Frontend', value: 'frontend' },
                  { title: 'Backend', value: 'backend' },
                  { title: 'Database', value: 'database' },
                  { title: 'DevOps', value: 'devops' },
                  { title: 'Testing', value: 'testing' },
                  { title: 'Tools', value: 'tools' },
                  { title: 'Other', value: 'other' },
                ],
              },
            }),
            defineField({
              name: 'proficiency',
              title: 'Proficiency Level',
              type: 'string',
              description: 'Your proficiency level with this technology',
              options: {
                list: [
                  { title: 'Beginner', value: 'beginner' },
                  { title: 'Intermediate', value: 'intermediate' },
                  { title: 'Advanced', value: 'advanced' },
                  { title: 'Expert', value: 'expert' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'category',
              media: 'name',
            },
            prepare(selection) {
              const { title, subtitle, media } = selection;
              return {
                title: title,
                subtitle: `${subtitle} • ${media}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'technologies',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      const techCount = subtitle?.length || 0;
      return {
        title: title,
        subtitle: `${techCount} ${techCount === 1 ? 'technology' : 'technologies'}`,
      };
    },
  },
});
