# Portfolio & Blog API

A RESTful API built with Node.js, Express, and MongoDB for managing a portfolio website with blog functionality.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Blog Management**: Full CRUD operations for blog posts
- **Portfolio Projects**: Manage portfolio projects with images and links
- **Comments System**: Users can comment on blog posts
- **Contact Form**: Handle contact form submissions
- **Role-Based Access**: Admin and user roles with different permissions
- **Security**: Helmet for security headers, CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
cd Lab-17/Lab-17/nodemon-lab
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
PORT=3000
```

4. **Seed the database (optional)**
```bash
node seedData.js
```

This will create:
- An admin user (email: admin@test.com, password: password123)
- 3 sample projects
- 3 sample blog posts

5. **Start the server**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "token": "jwt_token_here"
  }
}
```

### Blog Posts

#### Get All Posts
```http
GET /api/blog
```

#### Get Single Post
```http
GET /api/blog/:id
```

#### Create Post (Protected)
```http
POST /api/blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Blog Post",
  "content": "Post content here..."
}
```

#### Update Post (Protected - Author or Admin only)
```http
PUT /api/blog/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post (Protected - Author or Admin only)
```http
DELETE /api/blog/:id
Authorization: Bearer <token>
```

### Projects

#### Get All Projects
```http
GET /api/projects
```

#### Get Single Project
```http
GET /api/projects/:id
```

#### Create Project (Protected)
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Project",
  "description": "Project description",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://project-demo.com"
}
```

#### Update Project (Protected - Owner or Admin only)
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Project Title"
}
```

#### Delete Project (Protected - Owner or Admin only)
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

### Comments

#### Get Comments for a Post
```http
GET /api/blog/:postId/comments
```

#### Create Comment (Protected)
```http
POST /api/blog/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "body": "Great post!"
}
```

### Contact

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch..."
}
```

#### Get All Messages (Protected - Admin only)
```http
GET /api/contact
Authorization: Bearer <token>
```

## 🗂️ Project Structure

```
nodemon-lab/
├── controllers/        # Request handlers
│   ├── commentController.js
│   ├── contactController.js
│   ├── postController.js
│   ├── projectController.js
│   └── userController.js
├── middleware/         # Custom middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/            # Mongoose schemas
│   ├── Comment.js
│   ├── Message.js
│   ├── Post.js
│   ├── Project.js
│   └── UserModel.js
├── routes/            # API routes
│   ├── blogRoutes.js
│   ├── contactRoutes.js
│   ├── postRoutes.js
│   ├── projectRoutes.js
│   └── userRoutes.js
├── .env              # Environment variables
├── server.js         # Entry point
├── seedData.js       # Database seeding script
└── package.json
```

## 🔒 Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned when you register or login.

## 🚀 Deployment

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
5. Deploy!

## 📝 Test Credentials

After running `seedData.js`:

- **Email**: admin@test.com
- **Password**: password123

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- Helmet for security headers
- CORS configuration
- Input validation
- Protected routes with role-based access

## 📄 License

This project is part of a full-stack web development capstone project.

## 👨‍💻 Author

Built as part of the Full-Stack Web Development Course capstone project.

