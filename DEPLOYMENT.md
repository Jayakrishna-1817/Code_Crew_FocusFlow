# FocusFlow Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas account (free)

## Step 1: Deploy MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/focusflow`)

## Step 2: Deploy Backend (Render)

1. Go to [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: focusflow-backend
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key
   PORT=5000
   NODE_ENV=production
   ```
6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://focusflow-backend.onrender.com`)

## Step 3: Deploy Frontend (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://focusflow-backend.onrender.com
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```
6. Click "Deploy"

## Step 4: Update CORS in Backend

After deployment, update `server/index.js` to allow your Vercel domain:

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:8080'],
  credentials: true
}));
```

## Alternative: Deploy Both on Render

### Backend (same as above)

### Frontend on Render:
1. Create new "Static Site"
2. Build Command: `npm install && npm run build`
3. Publish Directory: `dist`
4. Environment Variables: same as Vercel

## Testing Your Deployment

1. Visit your Vercel URL
2. Create an account
3. Test writing, saving drafts
4. Test focus sessions
5. Test shop and credits

## Troubleshooting

- **CORS errors**: Check backend CORS configuration
- **API not connecting**: Verify VITE_API_URL is correct
- **Database errors**: Check MongoDB connection string and IP whitelist
- **Build failures**: Check Node.js version (use Node 18+)

## Free Tier Limits

- **MongoDB Atlas**: 512MB storage
- **Render**: 750 hours/month (sleeps after 15 min inactivity)
- **Vercel**: Unlimited deployments, 100GB bandwidth

## Production Checklist

- [ ] MongoDB database created and connected
- [ ] Backend deployed and running
- [ ] Frontend deployed and connected to backend
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Database has test data
- [ ] All features working (auth, drafts, sessions, shop)
