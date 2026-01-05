import 'dotenv/config';
import { adminDb } from './firebase-admin';

const sampleDocs = [
    {
        slug: '',
        title: 'Welcome to Listingslab',
        content: `
      <p>This is the home page content loaded from Firestore.</p>
      <h2>Powered by Next.js and Firestore</h2>
      <p>This site uses Static Site Generation (SSG) with Firestore as the content source. 
      All pages are pre-rendered at build time for optimal performance.</p>
      <h2>Features</h2>
      <ul>
        <li>Static site generation with Firestore</li>
        <li>Responsive three-column layout</li>
        <li>Dynamic routing with catch-all segments</li>
        <li>Easy content management via Firestore</li>
      </ul>
    `,
        description: 'Welcome to Listingslab - A Next.js site with Firestore SSG',
        featuredImage: 'https://live.staticflickr.com/65535/55019680500_9d68f883f8_b.jpg',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
            author: 'Listingslab Team',
            tags: ['home', 'welcome'],
            category: 'general'
        }
    },
    {
        slug: 'about',
        title: 'About Us',
        content: `
      <h2>Our Story</h2>
      <p>Listingslab is a modern web platform built with cutting-edge technologies.</p>
      <h2>Technology Stack</h2>
      <ul>
        <li>Next.js 16 with App Router</li>
        <li>React 19</li>
        <li>Firebase & Firestore</li>
        <li>TypeScript</li>
        <li>Progressive Web App (PWA)</li>
      </ul>
      <h2>Our Mission</h2>
      <p>We aim to provide the best developer experience while delivering blazing-fast websites 
      with excellent SEO and user experience.</p>
    `,
        description: 'Learn about Listingslab and our technology stack',
        featuredImage: 'https://live.staticflickr.com/65535/55019680500_9d68f883f8_b.jpg',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
            author: 'Listingslab Team',
            tags: ['about', 'company'],
            category: 'general'
        }
    },
    {
        slug: 'services',
        title: 'Our Services',
        content: `
      <h2>What We Offer</h2>
      <p>Professional web development services tailored to your needs.</p>
      <h3>Web Development</h3>
      <p>Custom web applications built with modern frameworks and best practices.</p>
      <h3>PWA Development</h3>
      <p>Progressive Web Apps that work offline and feel like native apps.</p>
      <h3>Static Site Generation</h3>
      <p>Lightning-fast websites with optimal SEO using SSG techniques.</p>
      <h3>Consulting</h3>
      <p>Expert advice on architecture, performance, and scalability.</p>
    `,
        description: 'Professional web development services',
        featuredImage: 'https://live.staticflickr.com/65535/55019680500_9d68f883f8_b.jpg',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
            author: 'Listingslab Team',
            tags: ['services', 'development'],
            category: 'services'
        }
    },
    {
        slug: 'blog',
        title: 'Blog',
        content: `
      <h2>Latest Articles</h2>
      <p>Stay up to date with the latest news and insights from our team.</p>
      <h3>Recent Posts</h3>
      <ul>
        <li>Getting Started with Next.js 16</li>
        <li>Firebase Firestore Best Practices</li>
        <li>Building Progressive Web Apps</li>
        <li>TypeScript Tips and Tricks</li>
      </ul>
      <p>Check back regularly for new content!</p>
    `,
        description: 'Latest articles and insights',
        featuredImage: 'https://live.staticflickr.com/65535/55019680500_9d68f883f8_b.jpg',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
            author: 'Listingslab Team',
            tags: ['blog', 'articles'],
            category: 'blog'
        }
    },
    {
        slug: 'contact',
        title: 'Contact Us',
        content: `
      <h2>Get In Touch</h2>
      <p>We'd love to hear from you! Reach out to discuss your project or ask any questions.</p>
      <h3>Contact Information</h3>
      <p><strong>Email:</strong> hello@listingslab.com</p>
      <p><strong>Location:</strong> Remote / Global</p>
      <h3>See us socially</h3>
      <p>Stay connected on social media for updates and news.</p>
      <p>We typically respond within 24 hours during business days.</p>
    `,
        description: 'Get in touch with Listingslab',
        featuredImage: 'https://live.staticflickr.com/65535/55019680500_9d68f883f8_b.jpg',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
            author: 'Listingslab Team',
            tags: ['contact', 'support'],
            category: 'general'
        }
    }
];

async function seedFirestore() {
    console.log('Starting Firestore seed...');

    try {
        const batch = adminDb.batch();

        for (const doc of sampleDocs) {
            const docRef = adminDb.collection('markdown').doc();
            batch.set(docRef, doc);
            console.log(`Queued: ${doc.title} (slug: ${doc.slug || 'home'})`);
        }

        await batch.commit();
        console.log(`\n✅ Successfully added ${sampleDocs.length} documents to the 'markdown' collection!`);
        console.log('\nYou can now run: yarn build');

    } catch (error) {
        console.error('Error seeding Firestore:', error);
        process.exit(1);
    }
}

// Run the seed function
seedFirestore()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
