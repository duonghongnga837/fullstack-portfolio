// Script to seed the database with sample data
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/UserModel');
const Post = require('./models/Post');
const Project = require('./models/Project');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // await Post.deleteMany({});
    // await Project.deleteMany({});
    // console.log('🗑️  Cleared existing data');

    // Find or create a test user
    let user = await User.findOne({ email: 'admin@test.com' });
    
    if (!user) {
      user = await User.create({
        username: 'admin',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin'
      });
      console.log('✅ Created admin user');
    } else {
      console.log('✅ Using existing admin user');
    }

    // Create sample projects
    const projectsData = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with MERN stack. Features include user authentication, product catalog, shopping cart, and payment integration.',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
        repoUrl: 'https://github.com/example/ecommerce',
        liveUrl: 'https://ecommerce-demo.vercel.app',
        user: user._id
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates using Socket.io. Built with React and Node.js.',
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
        repoUrl: 'https://github.com/example/task-manager',
        liveUrl: 'https://taskmanager-demo.vercel.app',
        user: user._id
      },
      {
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard that displays current weather and forecasts using OpenWeather API. Built with React and Tailwind CSS.',
        imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400',
        repoUrl: 'https://github.com/example/weather-dashboard',
        liveUrl: 'https://weather-demo.vercel.app',
        user: user._id
      }
    ];

    for (const projectData of projectsData) {
      const existing = await Project.findOne({ title: projectData.title });
      if (!existing) {
        await Project.create(projectData);
        console.log(`✅ Created project: ${projectData.title}`);
      } else {
        console.log(`⏭️  Project already exists: ${projectData.title}`);
      }
    }

    // Create sample blog posts
    const postsData = [
      {
        title: 'Getting Started with MERN Stack',
        content: `The MERN stack (MongoDB, Express, React, Node.js) is one of the most popular technology stacks for building modern web applications.

In this post, I'll share my journey learning the MERN stack and some tips for beginners.

**Why MERN?**
- JavaScript everywhere (frontend and backend)
- Large community and ecosystem
- Great for building scalable applications
- Excellent learning resources

**Key Concepts:**
1. MongoDB - NoSQL database for flexible data storage
2. Express - Minimal web framework for Node.js
3. React - Component-based UI library
4. Node.js - JavaScript runtime for server-side code

**Getting Started:**
Start with the basics of each technology individually, then combine them into a full-stack project. Build something you're passionate about!

Happy coding! 🚀`,
        author: user._id
      },
      {
        title: 'Best Practices for React Development',
        content: `After building several React applications, I've learned some valuable best practices that I want to share.

**1. Component Organization**
Keep your components small and focused. Each component should do one thing well.

**2. State Management**
Use Context API for global state, but don't overuse it. Local state is often sufficient.

**3. Custom Hooks**
Extract reusable logic into custom hooks. This keeps your components clean and promotes code reuse.

**4. Performance Optimization**
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images and assets

**5. Code Quality**
- Write meaningful component and variable names
- Add PropTypes or TypeScript for type safety
- Keep your code DRY (Don't Repeat Yourself)

**6. Testing**
Write tests for critical functionality. Start with integration tests before unit tests.

These practices have helped me write cleaner, more maintainable React code. What are your favorite React best practices?`,
        author: user._id
      },
      {
        title: 'Deploying Full-Stack Apps to the Cloud',
        content: `Deploying your application is an exciting milestone! Here's my guide to deploying full-stack applications.

**Frontend Deployment (Vercel/Netlify)**
These platforms are perfect for React apps:
- Automatic deployments from Git
- Global CDN for fast loading
- Free SSL certificates
- Easy environment variable management

**Backend Deployment (Render/Railway)**
For Node.js APIs, I recommend:
- Render: Great free tier, easy setup
- Railway: Modern interface, good developer experience
- Heroku: Mature platform (but no longer free)

**Database (MongoDB Atlas)**
MongoDB Atlas provides:
- Free tier with 512MB storage
- Automatic backups
- Global clusters
- Easy connection strings

**Deployment Checklist:**
✅ Set up environment variables
✅ Configure CORS properly
✅ Use production build for frontend
✅ Set up proper error handling
✅ Enable HTTPS
✅ Monitor your application

**Pro Tips:**
- Use separate databases for development and production
- Implement proper logging
- Set up monitoring and alerts
- Keep your dependencies updated

Deployment doesn't have to be scary. Start with these platforms and you'll have your app live in no time!`,
        author: user._id
      }
    ];

    for (const postData of postsData) {
      const existing = await Post.findOne({ title: postData.title });
      if (!existing) {
        await Post.create(postData);
        console.log(`✅ Created blog post: ${postData.title}`);
      } else {
        console.log(`⏭️  Blog post already exists: ${postData.title}`);
      }
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Email: admin@test.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

