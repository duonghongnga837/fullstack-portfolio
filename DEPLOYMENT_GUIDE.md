# 🚀 Deployment Guide

Complete guide to deploy your full-stack portfolio application to the cloud.

---

## 📋 Prerequisites

Before deploying, make sure you have:
- [x] GitHub account
- [x] MongoDB Atlas account (already have one)
- [x] Render account (for backend)
- [x] Vercel account (for frontend)

---

## 🗂️ Step 1: Prepare Your Code for Deployment

### 1.1 Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `fullstack-portfolio`
3. Don't initialize with README (we already have code)

### 1.2 Push Code to GitHub

```bash
# In your project root directory (C:\Users\Administrator\Desktop\1114)
git init
git add .
git commit -m "Initial commit - Full-stack portfolio project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fullstack-portfolio.git
git push -u origin main
```

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Sign Up for Render

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### 2.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the repository you just created

### 2.3 Configure Build Settings

**Basic Settings:**
- **Name**: `portfolio-api` (or any name you prefer)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `Lab-17/Lab-17/nodemon-lab`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Instance Type:**
- Select **"Free"** (for testing)

### 2.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://ahsanshehzad_db_blogUser:uAL9CkQ1JVPQJjJB@blogplatformcluster.2cue0xo.mongodb.net/?retryWrites=true&w=majority&appName=BlogPlatformCluster` |
| `JWT_SECRET` | `your_jwt_secret_key1122` |
| `JWT_EXPIRES_IN` | `7d` |
| `NODE_ENV` | `production` |

### 2.5 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://portfolio-api-xxxx.onrender.com`

### 2.6 Test Backend API

```bash
curl https://your-backend-url.onrender.com/api/projects
```

You should see JSON response with projects.

### 2.7 Seed Production Database (Optional)

If you want to add sample data to production:

1. In Render dashboard, go to your service
2. Click **"Shell"** tab
3. Run:
```bash
node seedData.js
```

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Sign Up for Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Authorize Vercel to access your repositories

### 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Select your GitHub repository
3. Click **"Import"**

### 3.3 Configure Project Settings

**Framework Preset:**
- Vercel should auto-detect: **Vite**

**Root Directory:**
- Click **"Edit"**
- Set to: `Lab-19/Lab-19/my-portfolio`

**Build Settings:**
- Build Command: `npm run build` (auto-detected)
- Output Directory: `dist` (auto-detected)
- Install Command: `npm install` (auto-detected)

### 3.4 Add Environment Variables

Click **"Environment Variables"**

Add this variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

⚠️ **Important**: Replace `your-backend-url.onrender.com` with your actual Render backend URL!

### 3.5 Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://your-project.vercel.app`

### 3.6 Test Frontend

1. Open the Vercel URL in your browser
2. Test all features:
   - Browse projects
   - Read blog posts
   - Login with test credentials
   - Create new content in Admin Dashboard

---

## 🔄 Step 4: Update Backend CORS Settings

After deploying frontend, update backend to allow requests from your Vercel domain.

### 4.1 Update server.js

In `Lab-17/Lab-17/nodemon-lab/server.js`, update CORS configuration:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-project.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

### 4.2 Commit and Push

```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will automatically redeploy your backend.

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Backend

```bash
# Get all projects
curl https://your-backend-url.onrender.com/api/projects

# Get all blog posts
curl https://your-backend-url.onrender.com/api/blog
```

### 5.2 Test Frontend

Visit your Vercel URL and test:

- [x] Home page loads
- [x] Projects page shows data from API
- [x] Blog page shows data from API
- [x] Can login with test credentials
- [x] Can create new project in Admin Dashboard
- [x] Can create new blog post in Admin Dashboard
- [x] Can post comments on blog posts
- [x] Contact form works

---

## 🎯 Step 6: Custom Domain (Optional)

### For Vercel (Frontend)

1. Go to your project settings in Vercel
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### For Render (Backend)

1. Go to your service settings in Render
2. Click **"Custom Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check Render logs for errors
- Verify environment variables are set correctly
- Check MongoDB connection string

**Problem**: Database connection failed
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MongoDB Atlas user credentials
- Ensure database cluster is running

### Frontend Issues

**Problem**: Can't connect to backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check browser console for CORS errors
- Ensure backend CORS allows your Vercel domain

**Problem**: Environment variables not working
- Vercel requires rebuild after adding env vars
- Click **"Redeploy"** in Vercel dashboard

**Problem**: 404 on page refresh
- Vercel should handle this automatically for Vite
- If not, add `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📊 Monitoring and Maintenance

### Render (Backend)

- **Logs**: View real-time logs in Render dashboard
- **Metrics**: Monitor CPU, memory usage
- **Auto-deploy**: Enabled by default on git push

### Vercel (Frontend)

- **Analytics**: Enable Vercel Analytics for visitor insights
- **Logs**: View deployment and function logs
- **Auto-deploy**: Enabled by default on git push

---

## 💰 Cost Considerations

### Free Tier Limits

**Render Free Tier:**
- ✅ 750 hours/month
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Cold start takes ~30 seconds

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ No sleep/cold starts

**MongoDB Atlas Free Tier:**
- ✅ 512MB storage
- ✅ Shared cluster
- ✅ No credit card required

### Upgrade Options

If you need better performance:
- **Render**: $7/month for always-on instance
- **Vercel**: Free tier is usually sufficient
- **MongoDB Atlas**: $9/month for dedicated cluster

---

## 🚀 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. Make changes to your code locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```
3. Render and Vercel automatically detect changes and redeploy
4. Wait 2-5 minutes for deployment
5. Changes are live!

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database seeded with sample data
- [ ] Can login with test credentials
- [ ] All CRUD operations work
- [ ] Comments system works
- [ ] Contact form works
- [ ] Theme toggle works
- [ ] Responsive design works on mobile
- [ ] No console errors in browser
- [ ] CORS configured correctly
- [ ] Environment variables set correctly

---

## 🎉 Congratulations!

Your full-stack portfolio application is now live on the internet!

**Share your URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-backend.onrender.com`

**Next Steps:**
- Share your portfolio with friends and potential employers
- Add your own projects and blog posts
- Customize the design and colors
- Add more features
- Monitor usage and performance

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com

---

**Happy Deploying! 🚀**

