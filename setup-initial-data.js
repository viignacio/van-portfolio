const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: 'gw2ay2qy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN // You'll need to set this environment variable
});

async function setupInitialData() {
  try {
    console.log('🚀 Setting up initial data...');

    // Create a hero section
    console.log('📝 Creating hero section...');
    const heroSection = await client.create({
      _type: 'heroSection',
      name: 'Van Ian Ignacio',
      title: 'QA Consultant',
      tagline: 'Transforming Quality Assurance through Strategic Automation & Innovation',
      description: 'Transforming Quality Assurance through Strategic Automation & Innovation',
      bio: 'Experienced QA Consultant with 10 years of expertise in software testing and quality assurance.',
      experience: 8,
      email: 'vanian.seven@hotmail.com',
      phone: '+639171759697',
      location: 'Philippines',
      resumeUrl: 'https://drive.google.com/file/d/14Qd4zhkr1Fg6Y4nAIBRhQqHpcrBDE7Yz/view?usp=drive_link',
      social: {
        linkedin: 'https://www.linkedin.com/in/viignacio-ctfl',
        github: 'https://github.com/viignacio-iona',
        facebook: 'https://www.facebook.com/vanian.ignacio/'
      },
      ctaText: 'Get in Touch',
      ctaLink: '#contact',
      backgroundStyle: 'default'
    });

    console.log('✅ Hero section created:', heroSection._id);

    // Create a hero layout block with sky blue background
    console.log('🔧 Creating hero layout block with sky blue background...');
    const heroLayoutBlock = await client.create({
      _type: 'layoutBlock',
      blockType: 'hero',
      isActive: true,
      backgroundStyle: {
        type: 'solid',
        solidColor: 'bg-sky-50!'
      },
      spacing: {
        paddingY: 'py-24',
        marginTop: ''
      },
      heroSection: {
        _type: 'reference',
        _ref: heroSection._id
      }
    });

    console.log('✅ Hero layout block created:', heroLayoutBlock._id);

    // Create a home page with the hero section
    console.log('🏠 Creating home page...');
    const homePage = await client.create({
      _type: 'page',
      title: 'Home',
      slug: {
        _type: 'slug',
        current: 'home'
      },
      isHomePage: true,
      layoutBlocks: [
        {
          _type: 'reference',
          _ref: heroLayoutBlock._id
        }
      ],
      seo: {
        metaTitle: 'Van Ian Ignacio - QA Consultant',
        metaDescription: 'Transforming Quality Assurance through Strategic Automation & Innovation'
      },
      publishedAt: new Date().toISOString()
    });

    console.log('✅ Home page created:', homePage._id);

    console.log('🎉 Initial data setup completed!');
    console.log('\n📋 Summary:');
    console.log(`- Hero Section ID: ${heroSection._id}`);
    console.log(`- Hero Layout Block ID: ${heroLayoutBlock._id}`);
    console.log(`- Home Page ID: ${homePage._id}`);
    console.log('\n🌐 You can now view your content in Sanity Studio at: http://localhost:3333');
    console.log('🎨 The hero section should now have a sky blue background!');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Check if required environment variable is set
if (!process.env.SANITY_TOKEN) {
  console.error('❌ SANITY_TOKEN environment variable is required');
  console.log('\n📝 To get your token:');
  console.log('1. Go to https://www.sanity.io/manage');
  console.log('2. Select your project: van-portfolio');
  console.log('3. Go to API section');
  console.log('4. Create a new token with write permissions');
  console.log('5. Set it as SANITY_TOKEN environment variable');
  console.log('\n💡 Example: export SANITY_TOKEN="sk..."');
  process.exit(1);
}

// Run the setup
setupInitialData();
