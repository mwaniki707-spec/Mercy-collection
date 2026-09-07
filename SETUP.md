# 🚀 Quick Setup Guide - Mercy Collections

This guide will help you get the Next.js version of Mercy Collections up and running.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase account
- Git (optional)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Firebase SDK
- Zustand

### 2. Firebase Project Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "mercy-collections")
4. Follow the setup wizard

#### Enable Firebase Services

Enable these services in your Firebase console:

1. **Authentication**
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"

2. **Firestore Database**
   - Go to Firestore Database
   - Create database
   - Start in **test mode** (we'll deploy rules later)

3. **Storage**
   - Go to Storage
   - Get started
   - Start in **test mode**

4. **Functions**
   - Functions will be enabled when you deploy

#### Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web" (</> icon)
4. Register your app
5. Copy the configuration object

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and add your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. Update Firebase Project ID

Edit `.firebaserc`:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### 5. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 6. Login to Firebase

```bash
firebase login
```

### 7. Deploy Firebase Rules

```bash
firebase deploy --only firestore:rules,storage:rules
```

### 8. Set up Cloud Functions

```bash
cd functions
npm install
cd ..
```

Deploy functions:

```bash
firebase deploy --only functions
```

### 9. Create Admin User

After deploying functions, create an admin user:

**For Emulators (Development):**
1. Start emulators: `npm run serve`
2. Visit: `http://127.0.0.1:5001/mercy-collections/us-central1/createSampleAdmin`

**For Production:**
1. Visit: `https://us-central1-mercy-collections.cloudfunctions.net/createSampleAdmin`

This creates:
- Email: `admin@mercy.com`
- Password: `password123`

### 10. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Development with Emulators

For local development with Firebase emulators:

### Terminal 1 - Next.js Dev Server
```bash
npm run dev
```

### Terminal 2 - Firebase Emulators
```bash
npm run serve
```

The app will automatically connect to emulators when running on localhost.

## Build for Production

```bash
# Build the Next.js app
npm run build

# The output will be in the 'out' directory
```

## Deploy to Firebase Hosting

```bash
# Deploy everything
npm run deploy

# Or deploy specific services
npm run deploy:hosting
npm run deploy:functions
```

## Verify Installation

After setup, verify everything works:

1. **Homepage** - Should show empty dress catalog
2. **Sign In** - Should allow you to create an account
3. **Admin Login** - Use admin@mercy.com / password123
4. **Admin Dashboard** - Click "Seed Database" to add sample dresses
5. **Shop** - Sample dresses should appear
6. **Cart** - Add items and verify cart works
7. **Checkout** - Test the checkout flow

## Common Issues

### Port Already in Use

If port 3000 is taken:
```bash
PORT=3001 npm run dev
```

### Firebase Emulator Connection Issues

Make sure emulators are running:
```bash
firebase emulators:start
```

Check emulator status at: http://localhost:4000

### Build Errors

Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### TypeScript Errors

Ensure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Customization

### Change WhatsApp Number

Update in these files:
- `src/components/DressCard.tsx` (line with wa.me)
- `src/app/cart/page.tsx` (line with wa.me)
- `src/app/layout.tsx` (footer)

Replace `254700000000` with your number.

### Change Theme Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#d4af37',        // Your color here
  'primary-dark': '#b8941f',
  // ...
}
```

### Update Site Name

Edit:
- `src/app/layout.tsx` (metadata)
- `src/components/Header.tsx` (logo text)

## Next Steps

1. ✅ Seed the database with sample products
2. ✅ Upload your own product images
3. ✅ Customize colors and branding
4. ✅ Update WhatsApp contact number
5. ✅ Test all features thoroughly
6. ✅ Deploy to production

## Support

For issues:
1. Check the [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
2. Review [README.md](./README.md)
3. Check Firebase Console for errors
4. Review browser console for client errors
5. Check Functions logs: `firebase functions:log`

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to version control
- Keep Firebase admin credentials secure
- Review and update Firestore security rules
- Use production mode for public deployment
- Enable reCAPTCHA for sign-up in production

Enjoy your new Next.js powered Mercy Collections! 🎉

