// Direct script to create or update Admin user in Firebase Emulator
const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

// Configure emulator hosts
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8085';

let app;
try {
  app = admin.app();
} catch (e) {
  app = initializeApp({
    projectId: 'mercy-collections-store',
  });
}

const auth = getAuth(app);
const db = getFirestore(app);

async function createAdmin() {
  const email = 'admin@mercy.com';
  const password = 'password123';
  const displayName = 'Admin User';

  console.log('\n========================================');
  console.log('  CREATING MERCY COLLECTIONS ADMIN USER');
  console.log('========================================\n');

  try {
    console.log('⏳ Connecting to Firebase Auth emulator (127.0.0.1:9099)...');
    let user;

    try {
      user = await auth.getUserByEmail(email);
      console.log(`ℹ️  User ${email} already exists (UID: ${user.uid}). Updating credentials...`);
      user = await auth.updateUser(user.uid, {
        password,
        displayName,
      });
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        user = await auth.createUser({
          email,
          password,
          displayName,
        });
        console.log(`✓ Created new user account (UID: ${user.uid})`);
      } else {
        throw err;
      }
    }

    // Set custom claim for admin
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log('✓ Granted admin custom claims { admin: true }');

    // Create / update Firestore profile
    console.log('⏳ Updating user profile in Firestore emulator (127.0.0.1:8085)...');
    await db.collection('users').doc(user.uid).set(
      {
        uid: user.uid,
        email,
        displayName,
        role: 'admin',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    console.log('✓ Saved admin profile in Firestore "users" collection');

    console.log('\n========================================');
    console.log('  ✅ SUCCESS! ADMIN ACCOUNT IS READY');
    console.log('========================================\n');
    console.log('Sign in credentials:');
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${password}\n`);
    console.log('Visit: http://localhost:3000/auth\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR creating admin user:', error.message);
    console.error('\n⚠️  Make sure Firebase Emulators are running (start-all.bat or start-firebase.bat).');
    process.exit(1);
  }
}

createAdmin();
