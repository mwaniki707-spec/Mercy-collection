# 🪟 Mercy Collections - Windows Quick Start

## 🚀 Super Easy Setup (Just Double-Click!)

### Step 1: Install Dependencies
**Double-click:** `setup.bat`

This will install all required packages. Wait for it to complete (takes 2-5 minutes).

---

### Step 2: Start the Application

You have **3 options**:

#### Option A: Start Everything (Recommended) ⭐
**Double-click:** `start-all.bat`

This opens 2 windows:
- **Next.js Dev Server** → Your website at `http://localhost:3000`
- **Firebase Emulators** → Backend services

#### Option B: Start Individually
**For Next.js only:**
- Double-click: `start-dev.bat`
- Visit: `http://localhost:3000`

**For Firebase only:**
- Double-click: `start-firebase.bat`
- Visit: `http://localhost:5000` (Emulator UI)

#### Option C: Manual (Command Prompt)
```cmd
npm run dev
```

---

### Step 3: Add Sample Dresses
**Double-click:** `add-samples.bat`

This adds 12 beautiful sample dresses to your store automatically!

**Important:** Firebase Emulators must be running first!

### Step 4: Create Admin Account

**Option A (Easiest):**  
**Double-click:** `create-admin-api.bat`  
Uses Next.js API - Only needs Next.js running

**Option B (Cloud Functions):**  
**Double-click:** `create-admin.bat`  
Uses Firebase Functions - Needs Firebase emulators running

**Admin Credentials:**
- **Email:** admin@mercy.com
- **Password:** password123

### Step 5: (Optional) Enable Social Login
**Double-click:** `ENABLE-SOCIAL-LOGIN.bat`

This opens a guide to set up:
- 🔵 Google Sign-In
- 📘 Facebook Login
- ⚫ TikTok Login

---

## 📍 Important URLs

| Service | URL |
|---------|-----|
| **Your Website** | http://localhost:3000 |
| Firebase Emulator UI | http://localhost:5000 |
| Auth Emulator | http://localhost:9099 |
| Firestore Emulator | http://localhost:8085 |
| Functions | http://localhost:5001 |
| Storage | http://localhost:9199 |

---

## 🛠️ Troubleshooting

### Firebase Functions Error ("functions.config() removed")
**Solution:** Double-click `QUICK-FIX.bat` - This fixes everything automatically!

Or manually:
1. Close Firebase terminal (Ctrl+C)
2. Run `fix-functions.bat`
3. Run `start-firebase.bat`

### "npm is not recognized"
**Solution:** Install Node.js from https://nodejs.org

### "Scripts are disabled"
**Solution:** Use the `.bat` files instead of PowerShell, or run this in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use
**Solution:** Close any applications using ports 3000 or 5000, or restart your computer.

### Can't Access Localhost / "Cannot GET /"
**Solution:** 
- Make sure Next.js is running: `start-dev.bat`
- Visit `http://localhost:3000` (NOT 5000)

---

## 🎯 Typical Workflow

1. **First time?** Run `setup.bat` once
2. **Every time you code:** Run `start-all.bat`
3. **Want sample data?** Run `add-samples.bat` (adds 12 dresses)
4. **Need admin?** Run `create-admin.bat` (once per session)
5. **Done coding?** Close the terminal windows (Ctrl+C)

---

## 📦 What Each File Does

| File | Purpose |
|------|---------|
| `setup.bat` | Installs all dependencies (npm install) |
| `start-dev.bat` | Starts Next.js server only |
| `start-firebase.bat` | Starts Firebase emulators only |
| `start-all.bat` | Starts both servers in separate windows |
| `add-samples.bat` | Adds 12 sample dresses to the database |
| `create-admin.bat` | Creates admin via Cloud Functions |
| `create-admin-api.bat` | ⭐ Creates admin via Next.js API (easier) |
| `fix-functions.bat` | Fixes function dependencies issues |
| `restart-firebase.bat` | Clean restart of Firebase emulators |
| `QUICK-FIX.bat` | ⭐ ONE-CLICK FIX for Firebase errors |
| `ENABLE-SOCIAL-LOGIN.bat` | Opens social login setup guide |

---

## 💡 Pro Tips

- **Keep both terminal windows open** while developing
- The website auto-reloads when you save files
- Firebase Emulator data resets when you restart it
- Use `create-admin.bat` after each Firebase restart

---

## 🆘 Need Help?

If something doesn't work:
1. Make sure Node.js is installed: `node --version`
2. Make sure you ran `setup.bat` first
3. Try restarting your computer
4. Check the SETUP.md file for detailed instructions

---

**Happy Coding! 🎉**

