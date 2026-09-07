# 📋 All Available Commands

Complete reference for all npm scripts and Firebase commands.

---

## 📦 NPM Scripts

### Development
```bash
# Start Next.js development server (http://localhost:3000)
npm run dev

# Start Firebase emulators (Auth, Firestore, Functions, Storage)
npm run serve
```

### Production Build
```bash
# Build Next.js app for production (outputs to 'out' directory)
npm run build

# Start production server (after build)
npm start
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

### Deployment
```bash
# Build and deploy everything to Firebase
npm run deploy

# Build and deploy only hosting
npm run deploy:hosting

# Deploy only Cloud Functions
npm run deploy:functions
```

---

## 🔥 Firebase CLI Commands

### Authentication & Setup
```bash
# Login to Firebase
firebase login

# Logout
firebase logout

# Initialize Firebase in project
firebase init

# List your Firebase projects
firebase projects:list

# Use a specific project
firebase use <project-id>
```

### Emulators
```bash
# Start all emulators
firebase emulators:start

# Start specific emulators
firebase emulators:start --only firestore,auth

# Export emulator data
firebase emulators:export ./emulator-data

# Import emulator data
firebase emulators:start --import=./emulator-data
```

### Deployment
```bash
# Deploy everything
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
firebase deploy --only firestore:indexes

# Preview changes before deploying
firebase deploy --only hosting --preview
```

### Functions
```bash
# View functions logs
firebase functions:log

# View logs for specific function
firebase functions:log --only createSampleAdmin

# Run functions shell (interactive)
firebase functions:shell

# Delete a function
firebase functions:delete functionName
```

### Firestore
```bash
# Export Firestore data
firebase firestore:export gs://your-bucket/firestore-backup

# Import Firestore data
firebase firestore:import gs://your-bucket/firestore-backup

# Delete all documents in a collection
firebase firestore:delete --all-collections
```

### Hosting
```bash
# List hosting sites
firebase hosting:sites:list

# Open hosted site
firebase open hosting:site
```

---

## 🛠️ Useful Development Commands

### Setup
```bash
# Install all dependencies
npm install

# Install Firebase CLI globally
npm install -g firebase-tools

# Install functions dependencies
cd functions && npm install && cd ..
```

### Clean & Reset
```bash
# Remove Next.js cache
rm -rf .next

# Remove build output
rm -rf out

# Clean install
rm -rf node_modules package-lock.json
npm install

# Full reset (careful!)
rm -rf node_modules .next out package-lock.json
npm install
```

### Database Management
```bash
# Seed sample dress data (must have emulators running)
npm run seed

# Create admin user (via function)
# Visit: http://127.0.0.1:5001/mercy-collections/us-central1/createSampleAdmin

# Or via curl
curl http://127.0.0.1:5001/mercy-collections/us-central1/createSampleAdmin
```

---

## 🔍 Debugging Commands

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

### View Logs
```bash
# Firebase Functions logs (live)
firebase functions:log --follow

# Next.js build output
npm run build -- --debug
```

### Environment
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check Firebase CLI version
firebase --version
```

---

## 📊 Firebase Console Commands

### Open Firebase Console
```bash
# Open project overview
firebase open

# Open specific sections
firebase open hosting:site
firebase open extensions
firebase open firestore
firebase open database
```

---

## 🧪 Testing Commands

### Local Testing
```bash
# Terminal 1: Start emulators
firebase emulators:start

# Terminal 2: Start Next.js dev server
npm run dev

# Now visit http://localhost:3000
```

### Production Testing
```bash
# Build production version
npm run build

# Test production build locally
npm start
```

---

## 🚀 Deployment Workflow

### First Time Deployment
```bash
# 1. Build the app
npm run build

# 2. Deploy rules first
firebase deploy --only firestore:rules,storage:rules

# 3. Deploy functions
firebase deploy --only functions

# 4. Deploy hosting
firebase deploy --only hosting

# 5. Create admin account
# Visit the createSampleAdmin function URL
```

### Regular Updates
```bash
# Quick deploy (everything)
npm run deploy

# Or selective
npm run deploy:hosting     # Just frontend
npm run deploy:functions   # Just backend
```

---

## 💡 Pro Tips

### Speed Up Development
```bash
# Only run emulators you need
firebase emulators:start --only firestore,auth

# Use different port for Next.js
PORT=3001 npm run dev
```

### Debug Build Issues
```bash
# Verbose output
npm run build -- --debug

# Check bundle size
npm run build && du -sh out/
```

### Quick Function Test
```bash
# Test function locally
curl -X GET http://127.0.0.1:5001/mercy-collections/us-central1/createSampleAdmin
```

---

## 📝 Common Workflows

### Starting Development
```bash
# Terminal 1
npm run serve

# Terminal 2
npm run dev

# Visit http://localhost:3000
```

### Deploying Changes
```bash
git add .
git commit -m "Your changes"
npm run deploy
```

### Updating Dependencies
```bash
npm update
cd functions && npm update && cd ..
```

---

## 🆘 Emergency Commands

### Rollback Deployment
```bash
# View deployment history
firebase hosting:clone SOURCE_SITE_ID:SOURCE_VERSION_ID TARGET_SITE_ID

# Rollback to previous version (via Firebase Console)
```

### Clear Everything
```bash
# Stop all processes
# CTRL+C in all terminals

# Clear caches
rm -rf .next out

# Reset emulator data
rm -rf .firebase
```

---

## 📚 Help Commands

```bash
# Firebase help
firebase --help

# Help for specific command
firebase deploy --help

# NPM scripts help
npm run
```

---

**Bookmark this page for quick reference! 🔖**

