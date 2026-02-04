# Phase 2: AWS Amplify Setup - Step-by-Step Guide
**Date**: February 4, 2026  
**Estimated Time**: 10-15 minutes

---

## 🎯 **Objective**
Connect your GitHub repository to AWS Amplify and configure the deployment settings.

---

## 📋 **Prerequisites (Already Complete from Phase 1)**
- ✅ GitHub Repository: `https://github.com/pasinduJDJ/cloudretail-frontend`
- ✅ Branch: `main`
- ✅ `amplify.yml` configuration file pushed
- ✅ Backend API URL ready

---

## 🚀 **Step-by-Step Instructions**

### **STEP 1: Access AWS Amplify Console**

1. **Open your web browser**
2. **Navigate to AWS Console**: https://console.aws.amazon.com
3. **Sign in** with your AWS credentials
4. **Search for "Amplify"** in the top search bar
5. **Click on "AWS Amplify"** from the results

**Screenshot checkpoint**: You should see the AWS Amplify welcome page

---

### **STEP 2: Start New Amplify App**

1. **Click "Get Started"** under **"Amplify Hosting"** section
   - If you don't see this, click **"New app"** → **"Host web app"**

2. **Select Git provider**: Choose **"GitHub"**

3. **Click "Continue"**

**What happens next**: AWS will ask you to authorize access to your GitHub account

---

### **STEP 3: Authorize GitHub Access**

1. **Click "Authorize AWS Amplify"** (if this is your first time)
   - A GitHub authorization page will open
   
2. **Sign in to GitHub** (if not already signed in)

3. **Grant permissions** to AWS Amplify
   - Click **"Authorize aws-amplify-console"**
   
4. **You'll be redirected back** to AWS Amplify Console

**Note**: This is a one-time authorization. Future deployments won't require this step.

---

### **STEP 4: Select Repository and Branch**

Now you should see a page titled **"Add repository branch"**

1. **Recently updated repositories**: Select **"pasinduJDJ/cloudretail-frontend"**
   - If you don't see it, use the search box to find it

2. **Branch**: Select **"main"** from the dropdown

3. **Monorepo (optional)**: Leave this blank (not applicable for your project)

4. **Click "Next"**

**Screenshot checkpoint**: You should see your repository and branch selected

---

### **STEP 5: Configure Build Settings**

You should now see the **"Configure build settings"** page

#### **5.1 App Name**
- **App name**: Enter `cloudretail-frontend` (or your preferred name)

#### **5.2 Build and Test Settings**
AWS Amplify should **auto-detect** your `amplify.yml` file ✅

You should see:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist/retailcloud-web/browser
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

**Verification**: 
- ✅ Check that `baseDirectory` shows: `dist/retailcloud-web/browser`
- ✅ Check that build command is: `npm run build`

**If auto-detection didn't work**: 
- Click **"Edit"** and paste the YAML configuration above

#### **5.3 Advanced Settings** (IMPORTANT!)

1. **Click "Advanced settings"** to expand the section

2. **Add Environment Variables**:

   Click **"Add environment variable"** and add these **TWO** variables:

   **Variable 1:**
   - **Key**: `API_URL`
   - **Value**: `https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev`

   **Variable 2:**
   - **Key**: `NODE_ENV`
   - **Value**: `production`

3. **Service role** (if asked):
   - Select **"Create new service role"** (recommended)
   - Or select an existing role if you have one

4. **Click "Next"**

---

### **STEP 6: Review Configuration**

You should now see the **"Review"** page with all your settings:

**Verify the following**:
- ✅ **Repository**: pasinduJDJ/cloudretail-frontend
- ✅ **Branch**: main
- ✅ **App name**: cloudretail-frontend
- ✅ **Build settings**: amplify.yml detected
- ✅ **Environment variables**: API_URL and NODE_ENV added

**If everything looks correct**:
1. **Click "Save and deploy"**

**What happens next**: AWS Amplify will start the deployment process automatically!

---

### **STEP 7: Monitor Deployment Progress**

After clicking "Save and deploy", you'll see the **deployment pipeline** with 4 stages:

#### **Deployment Stages:**

1. **Provision** (1-2 minutes)
   - AWS sets up the build environment
   - Status: Running... → ✅ Complete

2. **Build** (3-5 minutes)
   - Runs `npm install`
   - Runs `npm run build`
   - Compiles your Angular application
   - Status: Running... → ✅ Complete

3. **Deploy** (1-2 minutes)
   - Uploads built files to Amplify hosting
   - Configures CDN
   - Status: Running... → ✅ Complete

4. **Verify** (30 seconds)
   - Final checks
   - Status: Running... → ✅ Complete

**Total Time**: Approximately 5-10 minutes

---

### **STEP 8: View Build Logs (Optional but Recommended)**

While the build is running:

1. **Click on "Build"** stage to expand it
2. **View real-time logs** to see:
   - npm install progress
   - Build compilation
   - Any warnings or errors

**What to look for**:
- ✅ "npm install" completes successfully
- ✅ "npm run build" completes successfully
- ✅ Build artifacts created in `dist/retailcloud-web/browser`

---

### **STEP 9: Deployment Complete!**

Once all 4 stages show ✅ **Complete**, your app is LIVE!

You'll see:
- **Domain**: A URL like `https://main.d1234abcd5678.amplifyapp.com`
- **Status**: ✅ Deployed

---

## 🎉 **Success Indicators**

You'll know Phase 2 is complete when you see:
- ✅ All 4 deployment stages completed (green checkmarks)
- ✅ A live URL displayed at the top
- ✅ Status shows "Deployed"

---

## ⚠️ **Troubleshooting Common Issues**

### **Issue 1: Build Fails at "npm install"**
**Solution**: 
- Check build logs for specific error
- Verify `package.json` has all dependencies
- Try running `npm install` locally first

### **Issue 2: Build Fails at "npm run build"**
**Solution**:
- Check for TypeScript errors in build logs
- Verify Angular version compatibility
- Test build locally: `npm run build`

### **Issue 3: "Access Denied" to GitHub**
**Solution**:
- Re-authorize AWS Amplify in GitHub settings
- Check repository is public or AWS has access to private repos

### **Issue 4: Wrong Build Directory**
**Solution**:
- Edit `amplify.yml`
- Update `baseDirectory` to match your actual build output
- Redeploy

### **Issue 5: Environment Variables Not Working**
**Solution**:
- Go to App Settings → Environment variables
- Verify variables are correctly entered
- Redeploy the app

---

## 📸 **Expected Screenshots**

### **After Step 4 - Repository Selection**
You should see:
- Repository: pasinduJDJ/cloudretail-frontend
- Branch: main dropdown

### **After Step 5 - Build Settings**
You should see:
- YAML configuration displayed
- Environment variables section with API_URL and NODE_ENV

### **After Step 7 - Deployment Progress**
You should see:
- 4 stages: Provision → Build → Deploy → Verify
- Progress indicators for each stage

### **After Step 9 - Success**
You should see:
- Green checkmarks on all stages
- Live URL at the top
- "View deployment" button

---

## 📝 **Information to Save**

Once deployment is complete, **save these details**:

1. **Amplify App URL**: `https://main.____________.amplifyapp.com`
2. **App ID**: (shown in Amplify console)
3. **Region**: (shown in Amplify console)
4. **Deployment Date**: February 4, 2026

---

## ✅ **Phase 2 Completion Checklist**

Before moving to Phase 3, verify:
- [ ] AWS Amplify app created
- [ ] GitHub repository connected
- [ ] Build settings configured
- [ ] Environment variables added (API_URL, NODE_ENV)
- [ ] All 4 deployment stages completed successfully
- [ ] Live URL accessible
- [ ] No errors in build logs

---

## 🔗 **Quick Reference**

**Your GitHub Repository**: https://github.com/pasinduJDJ/cloudretail-frontend

**Environment Variables**:
```
API_URL = https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev
NODE_ENV = production
```

**Build Output Directory**: `dist/retailcloud-web/browser`

---

## ⏭️ **Next Steps**

Once Phase 2 is complete, you'll proceed to:
- **Phase 3**: Post-Deployment Verification
  - Test the live application
  - Verify all features work
  - Check API connectivity
  - Test authentication flow

---

**Ready to start? Open your browser and follow the steps above!** 🚀

**Need help?** Take screenshots of any errors and I can help troubleshoot!
