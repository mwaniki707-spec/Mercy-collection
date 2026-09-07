const { onDocumentUpdated, onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// Set emulator hosts for local development if running in emulator
if (process.env.FUNCTIONS_EMULATOR === 'true' || !process.env.K_SERVICE) {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099';
    process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8085';
}

// Initialize Firebase Admin
admin.initializeApp({
    projectId: process.env.GCLOUD_PROJECT || 'mercy-collections-store'
});
const db = admin.firestore();

// ==========================================
// ADMIN TOOLS
// ==========================================

// HTTP function to create a sample admin user
exports.createSampleAdmin = onRequest(async (req, res) => {
    const email = "admin@mercy.com";
    const password = "password123";

    try {
        // Check if user exists
        let user;
        try {
            user = await admin.auth().getUserByEmail(email);
            console.log("Admin user already exists");
        } catch (e) {
            if (e.code === 'auth/user-not-found') {
                // Create user
                user = await admin.auth().createUser({
                    email,
                    password,
                    displayName: "Admin User"
                });
                console.log("Created new admin user");
            } else {
                throw e;
            }
        }

        // Set custom claim
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });

        // Also create a user profile in Firestore
        await db.collection("users").doc(user.uid).set({
            email,
            displayName: "Admin User",
            role: "admin",
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        res.json({
            success: true,
            message: `Admin account ready!`,
            credentials: {
                email: email,
                password: password
            },
            info: "You can now sign in with these credentials."
        });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// AUTH TRIGGERS
// ==========================================
// Note: Auth triggers are handled client-side in the app
// User profiles are created when signing up in the frontend

// ==========================================
// INVENTORY TRIGGERS
// ==========================================

// Watch for stock changes and handle auto-deletion if stock hits 0
exports.onStockUpdate = onDocumentUpdated("dresses/{dressId}", async (event) => {
    const newValue = event.data.after.data();
    const previousValue = event.data.before.data();

    // Only delete if stock CHANGED from a positive number to 0
    if (newValue && previousValue &&
        typeof previousValue.stock === 'number' &&
        previousValue.stock > 0 &&
        newValue.stock === 0) {
        const dressId = event.params.dressId;
        console.log(`Stock reached 0 for dress ${dressId}. Deleting listing...`);

        try {
            await event.data.after.ref.delete();
            console.log(`Dress ${dressId} deleted successfully.`);
        } catch (error) {
            console.error(`Error deleting dress ${dressId}:`, error);
        }
    }
});

// ==========================================
// ORDER TRIGGERS
// ==========================================

// Send confirmation email (placeholder) or perform other post-order logic
exports.onOrderCreated = onDocumentCreated("orders/{orderId}", async (event) => {
    const order = event.data.data();

    if (!order) return;

    console.log(`New order received: ${event.params.orderId} for KSh ${order.total}`);
    console.log(`Customer: ${order.userEmail || 'Guest'} - Phone: ${order.phone}`);
    console.log(`Items: ${order.items.length} item(s)`);

    // Here you would integrate with an email service like SendGrid or Nodemailer
    // to send a confirmation email to order.userEmail
    // Example: await sendOrderConfirmationEmail(order);
});
