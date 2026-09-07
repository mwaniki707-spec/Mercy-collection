# Mercy Collections - Next.js E-commerce Platform

Modern e-commerce web application for Mercy Collections boutique, built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Firebase (Firestore, Auth, Storage, Functions)
- **Deployment**: Firebase Hosting

## 📦 Features

- ✨ Modern, responsive UI with Tailwind CSS
- 🛒 Shopping cart with persistent state
- 🔐 User authentication (Firebase Auth)
- 👔 Admin dashboard with role-based access
- 📸 Multi-media product gallery (images & videos)
- 💳 Simulated M-Pesa payment integration
- 📱 WhatsApp integration for direct orders
- ⚡ Real-time updates with Firestore
- 🎯 TypeScript for type safety
- 📦 Transaction-based inventory management

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd mercy-collection
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, Storage, and Functions
   - Copy your Firebase config

4. **Configure environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Firebase configuration

```bash
cp .env.local.example .env.local
```

5. **Install Firebase CLI and set up Functions**
```bash
npm install -g firebase-tools
cd functions
npm install
cd ..
```

## 🏃 Development

**Run the development server:**
```bash
npm run dev
```

**Run Firebase emulators:**
```bash
npm run serve
```

The app will be available at `http://localhost:3000`

## 🔥 Firebase Setup

### Initialize Firestore Security Rules

The Firestore rules are defined in `firestore.rules`. Deploy them:
```bash
firebase deploy --only firestore:rules
```

### Create Admin User

1. Start the Firebase emulators
2. Visit the Functions endpoint:
   - Emulator: `http://127.0.0.1:5001/<project-id>/us-central1/createSampleAdmin`
   - Production: `https://us-central1-<project-id>.cloudfunctions.net/createSampleAdmin`

3. Default admin credentials:
   - Email: `admin@mercy.com`
   - Password: `password123`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication page
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout & payment
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (catalog)
├── components/            # Reusable components
│   ├── DressCard.tsx
│   ├── Gallery.tsx
│   └── Header.tsx
├── lib/                   # Utilities
│   └── firebase.ts        # Firebase configuration
├── store/                 # State management
│   └── cartStore.ts       # Zustand cart store
└── types/                 # TypeScript types
    └── index.ts

functions/                 # Firebase Cloud Functions
public/                    # Static assets (legacy)
```

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm run deploy
```

Or deploy specific services:
```bash
npm run deploy:hosting    # Deploy hosting only
npm run deploy:functions   # Deploy functions only
```

## 🔑 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: '#d4af37',        // Gold
  'primary-dark': '#b8941f', // Dark gold
  // ...
}
```

### WhatsApp Number
Update the WhatsApp number in:
- `src/components/DressCard.tsx`
- `src/app/cart/page.tsx`
- `src/app/layout.tsx` (footer)

Replace `254700000000` with your actual number.

## 📝 Admin Features

- View and manage orders
- Add/Edit/Delete products
- Upload product images and videos
- Manage inventory
- Seed database with sample data

## 🔒 Security

- Firestore security rules enforce admin-only write access
- Client-side route protection for admin pages
- Custom claims for role-based access
- Transaction-based stock updates to prevent overselling

## 📄 License

© 2025 Mercy Collections. All rights reserved.

## 🤝 Support

For support, contact us via WhatsApp or email.

