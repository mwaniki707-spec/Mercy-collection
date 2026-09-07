# 🔐 Social Login Setup Guide

This guide will help you set up Google, Facebook, and TikTok authentication for Mercy Collections.

## 📋 Overview

Your app now supports:
- ✅ Google Sign-In
- ✅ Facebook Login
- ✅ TikTok Login
- ✅ Email/Password

---

## 🔧 Firebase Console Setup

### **Step 1: Access Firebase Console**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **mercy-collections**
3. Click **Authentication** in the left sidebar
4. Click the **Sign-in method** tab

---

## 1️⃣ Google Sign-In (Easiest)

### **Enable in Firebase:**

1. Click **Google** in the providers list
2. Toggle **Enable** switch ON
3. Enter **Project support email**: your-email@example.com
4. Click **Save**

✅ **That's it!** Google Sign-In is ready to use.

---

## 2️⃣ Facebook Login

### **A. Create Facebook App**

1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Choose **Consumer** as app type
4. Fill in:
   - **App Name**: Mercy Collections
   - **App Contact Email**: your-email@example.com
5. Click **Create App**

### **B. Add Facebook Login Product**

1. In your Facebook App dashboard, find **Facebook Login**
2. Click **Set Up**
3. Select **Web**
4. Enter **Site URL**: `http://localhost:3000` (for development)
5. Click **Save** → **Continue**

### **C. Get App Credentials**

1. Go to **Settings** → **Basic**
2. Copy these values:
   - **App ID**
   - **App Secret** (click Show)

### **D. Enable in Firebase**

1. Back in Firebase Console → Authentication → Sign-in method
2. Click **Facebook**
3. Toggle **Enable** ON
4. Paste:
   - **App ID** from Facebook
   - **App Secret** from Facebook
5. Copy the **OAuth redirect URI** shown by Firebase (looks like: `https://YOUR_PROJECT.firebaseapp.com/__/auth/handler`)

### **E. Configure Facebook App Callback**

1. Return to Facebook Developers Console
2. Go to **Facebook Login** → **Settings**
3. Add to **Valid OAuth Redirect URIs**:
   ```
   https://mercy-collections.firebaseapp.com/__/auth/handler
   ```
4. Click **Save Changes**

### **F. Make App Live (When Ready for Production)**

1. In Facebook App, toggle **App Mode** from Development to Live
2. Complete any required verification

✅ **Facebook Login is ready!**

---

## 3️⃣ TikTok Login

### **A. Create TikTok Developer Account**

1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Click **Register** or **Log in**
3. Complete registration process

### **B. Create an App**

1. Go to **Manage apps**
2. Click **Connect an app**
3. Fill in:
   - **App name**: Mercy Collections
   - **Category**: Shopping
4. Click **Create**

### **C. Add Login Kit**

1. In your TikTok app dashboard
2. Click **Add products**
3. Select **Login Kit**
4. Click **Apply**

### **D. Get Client Credentials**

1. Go to **Login Kit** → **Settings**
2. Copy:
   - **Client Key**
   - **Client Secret**

### **E. Configure OAuth in Firebase**

1. In Firebase Console → Authentication → Sign-in method
2. Scroll down to **Additional providers**
3. Click **Add new provider**
4. Select **OpenID Connect**
5. Fill in:
   - **Provider name**: TikTok
   - **Client ID**: [Your TikTok Client Key]
   - **Client Secret**: [Your TikTok Client Secret]
   - **Issuer**: `https://www.tiktok.com`

### **F. Set Redirect URI in TikTok**

1. Return to TikTok Developers Console
2. In **Login Kit** → **Settings**
3. Add **Redirect domain**:
   ```
   mercy-collections.firebaseapp.com
   ```
4. Add **Redirect URI**:
   ```
   https://mercy-collections.firebaseapp.com/__/auth/handler
   ```

✅ **TikTok Login is ready!**

---

## 🧪 Testing (Local Development)

### **For Emulators:**

Social login won't work fully with Firebase Emulators. You need to:

**Option 1: Test with Live Firebase (Recommended)**
1. Deploy your app: `npm run deploy`
2. Visit the live URL
3. Test social logins there

**Option 2: Use ngrok for Local Testing**
1. Install ngrok: `npm install -g ngrok`
2. Start Next.js: `npm run dev`
3. Run: `ngrok http 3000`
4. Use the ngrok URL for OAuth callbacks

### **Testing Checklist:**

- [ ] Google Sign-In works
- [ ] Facebook Login works
- [ ] TikTok Login works
- [ ] User profile created in Firestore
- [ ] User can access protected routes
- [ ] Sign out works properly

---

## 🌐 Production Setup

When deploying to production:

1. **Update Facebook App:**
   - Add production domain to Valid OAuth Redirect URIs
   - Make app Live

2. **Update TikTok App:**
   - Add production domain to Redirect domains
   - Submit for review if required

3. **Update Authorized Domains in Firebase:**
   - Go to Firebase Console → Authentication → Settings
   - Add your production domain to **Authorized domains**

---

## 🛠️ Troubleshooting

### **"Popup closed by user"**
- User closed the login popup
- Ask them to try again

### **"Account exists with different credential"**
- User previously signed up with a different method
- Ask them to use their original sign-in method
- Or implement account linking (advanced)

### **Facebook Login not working**
- Check App Mode (Development vs Live)
- Verify App ID and Secret in Firebase
- Ensure OAuth redirect URI matches exactly
- Clear browser cache

### **TikTok Login not working**
- TikTok OAuth requires app review
- Check Client Key and Secret
- Verify redirect URIs match exactly
- Ensure app is approved by TikTok

### **CORS Errors**
- Add your domain to Authorized Domains in Firebase
- Check redirect URIs in provider console

---

## 📱 Mobile App Considerations

If you plan to create mobile apps:

1. **Google**: Use Google Sign-In SDK for iOS/Android
2. **Facebook**: Use Facebook SDK for mobile
3. **TikTok**: Use TikTok SDK for mobile

Each requires additional setup in respective developer consoles.

---

## 🔒 Security Best Practices

1. **Never expose secrets**: Keep App Secrets in Firebase Console only
2. **Use HTTPS**: Always use HTTPS in production
3. **Validate tokens**: Firebase handles this automatically
4. **Set up authorized domains**: Only allow trusted domains
5. **Enable App Check**: Consider Firebase App Check for additional security

---

## 📊 Monitoring

Track authentication events in:
- **Firebase Console** → Authentication → Users
- **Firebase Console** → Analytics (if enabled)
- Check Firestore `users` collection for user profiles

---

## 🎯 Quick Reference

| Provider | Setup Difficulty | Best For |
|----------|------------------|----------|
| Google | ⭐ Easy | Everyone - most users have Google accounts |
| Facebook | ⭐⭐ Medium | Broad audience, especially 25+ age group |
| TikTok | ⭐⭐⭐ Complex | Younger audience (18-30), trendy apps |

---

## ✅ Next Steps

1. Set up Google Sign-In first (easiest)
2. Test it works
3. Add Facebook Login
4. Test again
5. Finally add TikTok (most complex)
6. Deploy to production
7. Update all OAuth callbacks with production URLs

---

**Need help?** Check the [Firebase Authentication Docs](https://firebase.google.com/docs/auth/web/start)

**Happy authenticating! 🎉**

