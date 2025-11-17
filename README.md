# 🎓 Full-Stack Web Development Capstone Project

A complete full-stack portfolio and blog application built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 📦 Project Overview

This project consists of two main components:

1. **Backend API** - RESTful API built with Node.js, Express, and MongoDB
2. **Frontend SPA** - Single-page application built with React, Tailwind CSS, and React Router

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with JWT
- Password hashing with bcrypt
- Role-based access control (admin/user)
- Protected routes on both frontend and backend

### 📝 Blog System
- Create, read, update, and delete blog posts
- Comment on blog posts
- Rich text content support
- Author attribution

### 💼 Portfolio Management
- Showcase projects with images
- Links to GitHub repositories and live demos
- Full CRUD operations for authenticated users

### 📧 Contact Form
- Public contact form submission
- Admin dashboard to view messages

### 🎨 Modern UI/UX
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- Smooth animations and transitions
- Loading states and error handling

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Option 1: Use the Launcher Script (Windows)

Double-click `start-project.bat` to automatically start both servers.

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd Lab-17/Lab-17/nodemon-lab
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Lab-19/Lab-19/my-portfolio
npm install
npm run dev
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## 🔑 Test Credentials

```
Email: admin@test.com
Password: password123
```

---

## 📚 Documentation

- **[Quick Start Guide](QUICK_START_GUIDE.md)** - Step-by-step guide to test all features
- **[Project Completion Summary](PROJECT_COMPLETION_SUMMARY.md)** - Detailed project overview
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - How to deploy to Render and Vercel
- **[Backend README](Lab-17/Lab-17/nodemon-lab/README.md)** - API documentation
- **[Frontend README](Lab-19/Lab-19/my-portfolio/README_NEW.md)** - Frontend documentation

---

## 🗂️ Project Structure

```
fullstack-portfolio/
├── Lab-17/Lab-17/nodemon-lab/     # Backend API
│   ├── controllers/                # Request handlers
│   ├── middleware/                 # Custom middleware
│   ├── models/                     # Mongoose schemas
│   ├── routes/                     # API routes
│   ├── server.js                   # Entry point
│   └── seedData.js                 # Database seeding
│
├── Lab-19/Lab-19/my-portfolio/    # Frontend SPA
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── context/               # React Context (Auth, Theme)
│   │   ├── pages/                 # Page components
│   │   ├── config/                # API configuration
│   │   ├── App.jsx                # Main app with routes
│   │   └── main.jsx               # Entry point
│   └── public/                    # Static assets
│
├── start-project.bat              # Quick launcher script
├── QUICK_START_GUIDE.md          # Testing guide
├── DEPLOYMENT_GUIDE.md           # Deployment instructions
└── PROJECT_COMPLETION_SUMMARY.md # Project overview
```

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers

### Frontend
- **React 19.1.1** - UI library
- **Vite** - Build tool
- **React Router DOM 7.9.5** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS
- **Context API** - State management

---

## 📱 Pages & Routes

### Public Routes
- `/` - Home page
- `/projects` - Portfolio projects
- `/blog` - Blog posts list
- `/blog/:id` - Individual blog post with comments
- `/contact` - Contact form
- `/login` - User login
- `/register` - User registration

### Protected Routes
- `/admin` - Admin dashboard (requires authentication)

---

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Blog Posts
- `GET /api/blog` - Get all posts
- `GET /api/blog/:id` - Get single post
- `POST /api/blog` - Create post (protected)
- `PUT /api/blog/:id` - Update post (protected)
- `DELETE /api/blog/:id` - Delete post (protected)

### Comments
- `GET /api/blog/:postId/comments` - Get comments for a post
- `POST /api/blog/:postId/comments` - Create comment (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin only)

---

## 🧪 Testing the Application

See **[QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)** for detailed testing instructions.

**Quick Test:**
1. Start both servers
2. Open http://localhost:5173
3. Browse projects and blog posts
4. Login with test credentials
5. Access Admin Dashboard
6. Create a new project or blog post
7. Post a comment on a blog post

---

## 🚀 Deployment

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for complete deployment instructions.

**Quick Deploy:**
1. Push code to GitHub
2. Deploy backend to Render
3. Deploy frontend to Vercel
4. Update environment variables
5. Test live application

---

## 📊 Features Checklist

### Completed ✅
- [x] User authentication (register, login, logout)
- [x] JWT token-based authorization
- [x] Blog post CRUD operations
- [x] Project CRUD operations
- [x] Comment system
- [x] Contact form
- [x] Admin dashboard
- [x] Protected routes
- [x] Dark/Light theme toggle
- [x] Responsive design
- [x] Error handling
- [x] Loading states
- [x] Form validation
- [x] API integration
- [x] Database seeding
- [x] Documentation

### Optional Enhancements 🎯
- [ ] Image upload functionality
- [ ] Search functionality
- [ ] Pagination
- [ ] User profile pages
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Rich text editor
- [ ] Analytics dashboard

---

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development with MERN stack
- RESTful API design and implementation
- React component architecture and hooks
- State management with Context API
- Authentication and authorization
- Database design and operations
- Modern CSS with Tailwind
- Responsive web design
- Git version control
- Deployment to cloud platforms

---

## 📝 License

This project is part of a full-stack web development capstone project for educational purposes.

---

## 👨‍💻 Author

Built as the capstone project for the Full-Stack Web Development Course.

---

## 🙏 Acknowledgments

- React documentation and community
- Express.js documentation
- MongoDB documentation
- Tailwind CSS
- Vite
- All open-source contributors

---

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the Quick Start Guide
3. Check browser console for errors
4. Review server logs
5. Consult the API documentation

---

## 🎉 Project Status

**Status**: ✅ COMPLETE

Both frontend and backend are fully functional and ready for:
- Local development and testing
- Deployment to production
- Further customization and enhancement

---

**Enjoy your full-stack portfolio application! 🚀**

