# Vercel Deployment Guide for Ubuntu Dashboard

## 🚀 Quick Deployment Steps

### 1. Environment Variables Setup (CRITICAL)

Before deploying, you **MUST** set up these environment variables in your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to get these values:**
- Log in to [Supabase Dashboard](https://supabase.com/dashboard)
- Select your project
- Go to **Settings** → **API**
- Copy the **Project URL** and **anon/public key**

### 2. Deploy to Vercel

#### Option A: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push

#### Option B: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### 3. Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Supabase database is set up with proper tables
- [ ] Test authentication functionality
- [ ] Verify real-time updates work

## 🔧 Fixed Issues

### ✅ Supabase Configuration
- Added fallback values to prevent build failures
- Added production validation for environment variables
- Build will now succeed even without env vars (but will show helpful error in production)

### ✅ Next.js 15 Compatibility
- Fixed viewport configuration warnings
- Moved viewport from metadata to separate export
- Removed duplicate viewport meta tags

### ⚠️ Remaining Warnings (Non-Critical)
- ESLint warnings about `<img>` vs `<Image />` - these don't prevent deployment
- React hooks dependency warning - cosmetic only

## 🛠️ Troubleshooting

### Build Fails with "supabaseUrl is required"
- **Solution**: Set environment variables in Vercel dashboard
- **Check**: Variables are named exactly as shown above (case-sensitive)

### Viewport Warnings
- **Status**: ✅ Fixed in this update

### Database Connection Issues
- **Check**: Supabase project is active and not paused
- **Verify**: Database tables exist (run the SQL setup scripts)
- **Test**: Environment variables are correct

## 📚 Additional Resources

- [Vercel Environment Variables Guide](https://vercel.com/docs/projects/environment-variables)
- [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

## 🎯 Next Steps After Deployment

1. Set up Supabase database tables (if not done already)
2. Configure authentication providers
3. Test all functionality in production
4. Set up monitoring and analytics

---

**Need Help?** Check the project's README.md or create an issue in the repository.
