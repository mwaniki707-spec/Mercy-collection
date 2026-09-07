# ⚡ Quick Start - Mercy Collections

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- Firebase account created

## 🚀 Fast Setup (5 Steps)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Configure Firebase
Create `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3️⃣ Update Project ID
Edit `.firebaserc`:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### 4️⃣ Deploy Firebase (First Time)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy rules and functions
firebase deploy --only firestore:rules,storage:rules,functions
```

### 5️⃣ Run Development Server
```bash
npm run dev
```

**Open [http://localhost:3000](http://localhost:3000)** 🎉

---

## 🔐 Create Admin Account

After deploying functions, visit:
```
http://127.0.0.1:5001/mercy-collections/us-central1/createSampleAdmin
```

Login with:
- **Email**: admin@mercy.com
- **Password**: password123

---

## 📦 Seed Sample Data

**Option 1: Automatic (Recommended)**
```bash
npm run seed
```
or double-click `add-samples.bat` (Windows)

**Option 2: Via Admin Panel**
1. Login as admin
2. Go to Admin Dashboard
3. Click "🌱 Seed Database"
4. Sample dresses will appear!

---

## 🎯 What Works Now

✅ Browse products catalog  
✅ Add items to cart  
✅ User authentication  
✅ Admin dashboard  
✅ Product management  
✅ Checkout flow  
✅ WhatsApp integration  
✅ Real-time updates  

---

## 📚 Need More Help?

- **Full Setup**: See [SETUP.md](./SETUP.md)
- **Migration Info**: See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **All Changes**: See [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md)
- **Main Docs**: See [README.md](./README.md)

---

## 🐛 Common Issues

**Port 3000 in use?**
```bash
PORT=3001 npm run dev
```

**Build errors?**
```bash
rm -rf .next node_modules package-lock.json
npm install
```

**Firebase connection issues?**
- Check `.env.local` values
- Verify project ID in `.firebaserc`
- Ensure rules are deployed

---

## 🚀 Deploy to Production

```bash
npm run deploy
```

That's it! Your site is live on Firebase Hosting! 🎊

---

**Happy coding! 💻✨**

