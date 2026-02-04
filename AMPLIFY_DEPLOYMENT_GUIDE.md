# AWS Amplify Deployment Guide - CloudRetail Frontend

## 📋 **Overview**

This guide will help you deploy your Angular frontend to AWS Amplify with automatic CI/CD.

**Architecture Flow:**
```
User → Route 53 (DNS) → AWS Amplify (Frontend) → API Gateway (Backend)
```

---

## 🚀 **Step-by-Step Deployment**

### **Step 1: Push Code to GitHub**

1. **Initialize Git** (if not already done):
```bash
cd e:\2. A P I I T Campus\5. AWS\Assignment 2\cloudretail\frontend\retailcloud-web
git init
git add .
git commit -m "Initial commit - CloudRetail frontend"
```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Repository name: `cloudretail-frontend`
   - Make it **Public** or **Private**
   - Click "Create repository"

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/cloudretail-frontend.git
git branch -M main
git push -u origin main
```

---

### **Step 2: Deploy to AWS Amplify**

#### **2.1 Open AWS Amplify Console**

1. Login to AWS Console: https://console.aws.amazon.com
2. Search for "**Amplify**" in the services search bar
3. Click "**AWS Amplify**"
4. Click "**Get Started**" under "Amplify Hosting"

#### **2.2 Connect Your Repository**

1. **Select Git provider**: Choose **GitHub**
2. Click "**Continue**"
3. **Authorize AWS Amplify** to access your GitHub account
4. **Select repository**: `cloudretail-frontend`
5. **Select branch**: `main`
6. Click "**Next**"

#### **2.3 Configure Build Settings**

1. **App name**: `cloudretail-frontend`
2. **Environment**: `dev` (or `prod`)
3. **Build settings**: Amplify will auto-detect `amplify.yml`
4. **Advanced settings** (click to expand):
   - Add environment variables if needed:
     ```
     API_URL=https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev
     ```
5. Click "**Next**"

#### **2.4 Review and Deploy**

1. Review all settings
2. Click "**Save and deploy**"
3. Wait for deployment (5-10 minutes)

**Deployment Stages:**
- ✅ Provision
- ✅ Build
- ✅ Deploy
- ✅ Verify

---

### **Step 3: Access Your Deployed App**

Once deployment is complete:

1. **Amplify URL**: You'll get a URL like:
   ```
   https://main.d1234abcd5678.amplifyapp.com
   ```

2. **Test your app**:
   - Click the URL
   - Verify all pages work
   - Test login/register
   - Test cart and checkout

---

### **Step 4: Configure Custom Domain (Optional)**

#### **4.1 Using Route 53**

1. In Amplify Console, click "**Domain management**"
2. Click "**Add domain**"
3. Enter your domain: `cloudretail.com`
4. Amplify will automatically:
   - Create SSL certificate
   - Configure DNS records
   - Set up HTTPS

#### **4.2 DNS Configuration**

If using external DNS:
1. Get the Amplify DNS target
2. Create CNAME record:
   ```
   www.cloudretail.com → main.d1234abcd5678.amplifyapp.com
   ```

---

## 🔧 **Configuration Files**

### **amplify.yml** (Already created)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
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

### **Environment Variables in Amplify**

Add these in Amplify Console → Environment variables:

| Key | Value |
|-----|-------|
| `API_URL` | `https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev` |
| `NODE_ENV` | `production` |

---

## 🔄 **Continuous Deployment (CI/CD)**

### **How It Works:**

1. You push code to GitHub:
   ```bash
   git add .
   git commit -m "Update home page"
   git push
   ```

2. **Amplify automatically**:
   - Detects the push
   - Runs build
   - Deploys new version
   - Updates live site

### **Build Notifications:**

1. In Amplify Console → **Notifications**
2. Add email or SNS topic
3. Get notified on:
   - Build success
   - Build failure
   - Deployment complete

---

## 🐛 **Troubleshooting**

### **Build Fails**

**Error: "npm install failed"**
- **Solution**: Check `package.json` dependencies
- Run `npm install` locally first

**Error: "Build directory not found"**
- **Solution**: Update `amplify.yml` baseDirectory:
  ```yaml
  baseDirectory: dist/retailcloud-web/browser
  ```

**Error: "Angular build failed"**
- **Solution**: Check build logs in Amplify Console
- Fix TypeScript errors locally first

### **App Not Loading**

**Blank page after deployment**
- **Solution**: Check browser console for errors
- Verify API URL in environment variables

**404 on page refresh**
- **Solution**: Add redirect rules in Amplify Console:
  ```
  Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>
  Target: /index.html
  Status: 200 (Rewrite)
  ```

### **CORS Errors**

**API calls failing**
- **Solution**: Update API Gateway CORS settings
- Add Amplify domain to allowed origins

---

## 💰 **Cost Estimation**

### **AWS Amplify Pricing:**

| Resource | Free Tier | After Free Tier |
|----------|-----------|-----------------|
| Build minutes | 1,000 min/month | $0.01/min |
| Hosting | 15 GB storage | $0.023/GB |
| Data transfer | 15 GB/month | $0.15/GB |

**Estimated Monthly Cost:**
- Small traffic (< 10k visits): **$0 - $5**
- Medium traffic (100k visits): **$10 - $20**
- High traffic (1M visits): **$50 - $100**

---

## 📊 **Monitoring & Analytics**

### **Amplify Console Metrics:**

1. **Traffic**: Page views, unique visitors
2. **Performance**: Load time, response time
3. **Errors**: 4xx, 5xx errors
4. **Build history**: Success/failure rate

### **CloudWatch Integration:**

- Amplify automatically sends logs to CloudWatch
- View detailed metrics in CloudWatch dashboard

---

## 🔐 **Security Best Practices**

### **1. Enable HTTPS**
- ✅ Amplify provides free SSL certificate
- ✅ Automatic HTTPS redirect

### **2. Environment Variables**
- ✅ Store API keys in Amplify environment variables
- ✅ Never commit secrets to Git

### **3. Access Control**
- Set up Amplify access control for staging environments
- Use Cognito for user authentication

### **4. Content Security Policy**
- Add CSP headers in Amplify Console
- Protect against XSS attacks

---

## 🎯 **Post-Deployment Checklist**

- [ ] App loads successfully
- [ ] All routes work (home, products, cart, auth)
- [ ] API calls work (check Network tab)
- [ ] Login/Register works
- [ ] Cart and checkout flow works
- [ ] Payment processing works
- [ ] Email notifications work
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)

---

## 📚 **Useful Commands**

### **Local Development:**
```bash
# Start dev server
npm start

# Build for production
npm run build

# Test production build locally
npx http-server dist/retailcloud-web/browser
```

### **Git Commands:**
```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub (triggers Amplify build)
git push

# View commit history
git log --oneline
```

### **Amplify CLI (Optional):**
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Pull Amplify environment
amplify pull

# Publish changes
amplify publish
```

---

## 🔗 **Important Links**

- **AWS Amplify Console**: https://console.aws.amazon.com/amplify
- **Amplify Documentation**: https://docs.amplify.aws
- **Your API Gateway**: https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev
- **GitHub Repository**: (Add your repo URL here)
- **Live App URL**: (Add after deployment)

---

## 📞 **Support**

**AWS Amplify Support:**
- Documentation: https://docs.amplify.aws
- Community: https://github.com/aws-amplify/amplify-js/discussions
- AWS Support: https://console.aws.amazon.com/support

**CloudRetail Project:**
- Backend API: Already deployed ✅
- Frontend: Deploy using this guide
- Database: DynamoDB (already configured) ✅
- Auth: Cognito (already configured) ✅

---

## ✅ **Quick Start Summary**

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

2. **Deploy to Amplify**:
   - Open AWS Amplify Console
   - Connect GitHub repository
   - Click "Save and deploy"
   - Wait 5-10 minutes

3. **Access Your App**:
   - Get Amplify URL
   - Test all features
   - Configure custom domain (optional)

4. **Continuous Deployment**:
   - Push code to GitHub
   - Amplify auto-deploys
   - Live in 5 minutes

---

**That's it! Your CloudRetail frontend is now live on AWS Amplify!** 🎉

---

**Last Updated**: February 2026  
**Version**: 1.0  
**Author**: CloudRetail Team
