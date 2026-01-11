# Deploy FocusFlow to Render - Complete Guide

## Step 1: Setup MongoDB Atlas (Database)

1. Go to https://mongodb.com/cloud/atlas
2. Sign up/Login
3. Create a **FREE** cluster:
   - Provider: AWS
   - Region: Choose nearest to you
   - Cluster Tier: M0 Sandbox (FREE)
4. Create Database User:
   - Database Access  Add New User
   - Username: `focusflow`
   - Password: Generate strong password (SAVE THIS!)
5. Setup Network Access:
   - Network Access  Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get Connection String:
   - Click "Connect"  "Connect your application"
   - Copy connection string: `mongodb+srv://focusflow:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://focusflow:yourpassword@cluster0.xxxxx.mongodb.net/focusflow?retryWrites=true&w=majority`

## Step 2: Deploy to Render

### Option A: One-Click Deploy (Easiest)

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +"  "Blueprint"
4. Select your `Code_Crew_FocusFlow` repository
5. Enter MongoDB URI when prompted
6. Click "Apply" - Render will deploy both frontend and backend!

### Option B: Manual Deploy (More Control)

#### Deploy Backend First:

1. Go to https://render.com
2. Click "New +"  "Web Service"
3. Connect your GitHub repository: `Code_Crew_FocusFlow`
4. Configure:
   ```
   Name: focusflow-backend
   Region: Oregon (or closest)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```
5. **Environment Variables** (click "Advanced"):
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = your_mongodb_connection_string_from_step1
   JWT_SECRET = your_random_secret_key_here_change_this
   ```
6. Click "Create Web Service"
7. **Copy the backend URL** (e.g., `https://focusflow-backend.onrender.com`)

#### Deploy Frontend:

1. Click "New +"  "Static Site"
2. Select same repository: `Code_Crew_FocusFlow`
3. Configure:
   ```
   Name: focusflow-frontend
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```
4. **Environment Variables**:
   ```
   VITE_API_URL = https://focusflow-backend.onrender.com
   ```
   (Use the backend URL from previous step)
5. Click "Create Static Site"

## Step 3: Test Your Live App

1. Wait 5-10 minutes for deployment
2. Visit your frontend URL (e.g., `https://focusflow-frontend.onrender.com`)
3. Test:
   -  Sign up for new account
   -  Login
   -  Create a draft
   -  Start focus session
   -  Check shop/credits

## Important Notes

 **Free Tier Limitations:**
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- 750 hours/month free (enough for 24/7)

 **If You See Errors:**

1. **500 Error**: Check backend logs in Render dashboard
2. **CORS Error**: Backend might be sleeping, wait 30 seconds
3. **Database Connection Error**: Check MongoDB URI is correct

## Environment Variables Checklist

### Backend (.env):
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/focusflow
JWT_SECRET=your_very_long_random_secret_key
```

### Frontend:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Updating Your App

```bash
git add .
git commit -m "Update app"
git push origin main
```

Render will **automatically redeploy** when you push to GitHub!

## Your Live URLs

After deployment, you'll have:
- **Frontend**: https://focusflow-frontend.onrender.com
- **Backend**: https://focusflow-backend.onrender.com
- **Database**: MongoDB Atlas (private)

## Need Help?

- Render Dashboard: https://dashboard.render.com
- MongoDB Dashboard: https://cloud.mongodb.com
- Check backend logs in Render for errors
