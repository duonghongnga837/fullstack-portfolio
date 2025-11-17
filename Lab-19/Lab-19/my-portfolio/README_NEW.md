# Portfolio & Blog SPA

A modern, responsive portfolio and blog single-page application built with React, Tailwind CSS, and React Router.

## 🚀 Features

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Theme**: Toggle between dark and light modes
- **User Authentication**: Register, login, and logout functionality
- **Blog System**: Browse blog posts, read individual posts, and comment
- **Portfolio Projects**: Showcase your projects with images and links
- **Admin Dashboard**: Manage blog posts and projects (authenticated users only)
- **Contact Form**: Send messages through a contact form
- **Protected Routes**: Admin dashboard accessible only to authenticated users
- **Real-time API Integration**: Connected to Node.js/Express backend

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

1. **Navigate to the project directory**
```bash
cd Lab-19/Lab-19/my-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, change this to your deployed backend URL:
```env
VITE_API_URL=https://your-backend-url.com/api
```

4. **Start the development server**
```bash
npm run dev
```

The app will run on `http://localhost:5173`

5. **Build for production**
```bash
npm run build
```

## 📱 Pages

### Public Pages

- **Home** (`/`) - Landing page with introduction
- **Projects** (`/projects`) - Display all portfolio projects
- **Blog** (`/blog`) - List of all blog posts
- **Blog Detail** (`/blog/:id`) - Individual blog post with comments
- **Contact** (`/contact`) - Contact form
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration

### Protected Pages

- **Admin Dashboard** (`/admin`) - Manage projects and blog posts (requires authentication)

## 🎨 Features in Detail

### Theme Switching
Toggle between dark and light modes using the theme button in the header. Theme preference is saved in localStorage.

### Authentication Flow
1. Register a new account or login with existing credentials
2. Upon successful login, JWT token is stored in localStorage
3. Authenticated users can access the Admin Dashboard
4. Authenticated users can post comments on blog posts
5. Logout clears the token and redirects to home

### Admin Dashboard
Authenticated users can:
- **Create** new blog posts and projects
- **Edit** their own posts and projects
- **Delete** their own posts and projects
- View all their content in organized tabs

### Blog & Comments
- Browse all blog posts
- Click to read full post
- Authenticated users can leave comments
- Comments display author and timestamp

### Projects
- Display portfolio projects with images
- Links to GitHub repositories
- Links to live demos
- Responsive grid layout

## 🗂️ Project Structure

```
my-portfolio/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── ProtectedRoute.jsx
│   ├── config/        # Configuration files
│   │   └── api.js     # API endpoints and helpers
│   ├── context/       # React Context
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/         # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetailPage.jsx
│   │   └── Register.jsx
│   ├── App.jsx        # Main app component with routes
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles (Tailwind)
├── .env               # Environment variables
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🔧 Technologies Used

- **React 19.1.1** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM 7.9.5** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Context API** - State management (Auth & Theme)
- **Fetch API** - HTTP requests to backend

## 🎯 Key Components

### AuthContext
Manages authentication state:
- User information
- JWT token
- Login/logout/register functions
- Persists auth state to localStorage

### ThemeContext
Manages theme state:
- Dark/light mode toggle
- Persists theme preference to localStorage

### ProtectedRoute
Wrapper component that:
- Checks if user is authenticated
- Redirects to login if not authenticated
- Renders protected content if authenticated

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
vercel
```

4. Set environment variable on Vercel dashboard:
   - `VITE_API_URL` = your deployed backend URL

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

3. Set environment variable:
   - `VITE_API_URL` = your deployed backend URL

## 🔐 Test Credentials

Use these credentials to test the application (after backend seeding):

- **Email**: admin@test.com
- **Password**: password123

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Theme
Modify `ThemeContext.jsx` to add more theme options or customize existing themes.

### API Endpoints
Update `src/config/api.js` to modify API endpoints or add new ones.

## 🐛 Troubleshooting

### CORS Errors
Make sure your backend has CORS enabled and allows requests from your frontend URL.

### API Connection Issues
- Check that `VITE_API_URL` in `.env` is correct
- Ensure backend server is running
- Check browser console for error messages

### Authentication Issues
- Clear localStorage and try logging in again
- Check that JWT token is being sent in request headers
- Verify backend JWT_SECRET matches

## 📄 License

This project is part of a full-stack web development capstone project.

## 👨‍💻 Author

Built as part of the Full-Stack Web Development Course capstone project.

## 🙏 Acknowledgments

- React documentation
- Tailwind CSS
- Vite
- React Router

