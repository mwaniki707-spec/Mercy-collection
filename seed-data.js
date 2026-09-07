// Seed sample dress data to Firebase Firestore
const admin = require('firebase-admin');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin with emulator
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8085';

let app;
try {
  app = admin.app();
} catch (e) {
  app = initializeApp({
    projectId: 'mercy-collections-store',
  });
}

const db = getFirestore(app);

const sampleDresses = [
  {
    name: "Floral Summer Maxi Dress",
    price: 3500,
    stock: 10,
    sizes: ["S", "M", "L", "XL"],
    category: "Maxi",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1509319117992-c4e5f6d6f8f9?auto=format&fit=crop&w=800&q=80",
        type: "image"
      },
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Light and breezy floral maxi dress perfect for Nairobi sunny weekends and beach getaways."
  },
  {
    name: "Elegant Evening Gown",
    price: 8500,
    stock: 5,
    sizes: ["6", "8", "10", "12", "14"],
    category: "Evening",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
        type: "image"
      },
      {
        url: "https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Sophisticated jewel-toned evening gown with exquisite tailoring for galas, dinners, and red carpet occasions."
  },
  {
    name: "Casual Chic Midi Dress",
    price: 4200,
    stock: 15,
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Casual",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Versatile midi dress designed for effortless day-to-night styling in Nairobi."
  },
  {
    name: "Boho Beach Dress",
    price: 2800,
    stock: 8,
    sizes: ["S", "M", "L"],
    category: "Maxi",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1506629905607-d9b1a2e9c3a0?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Relaxed bohemian style dress perfect for coast trips and weekend brunch."
  },
  {
    name: "Cocktail Party Dress",
    price: 5500,
    stock: 3,
    sizes: ["4", "6", "8", "10"],
    category: "Cocktail",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Stunning cocktail dress that makes a bold and memorable statement at any party."
  },
  {
    name: "Vintage Lace Dress",
    price: 6000,
    stock: 7,
    sizes: ["S", "M", "L", "XL"],
    category: "Evening",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Timeless vintage-inspired lace dress with romantic intricate embroidery."
  },
  {
    name: "Professional Wrap Dress",
    price: 4800,
    stock: 12,
    sizes: ["6", "8", "10", "12", "14", "16"],
    category: "Office",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Classic wrap dress tailored for executive elegance and corporate meetings."
  },
  {
    name: "Romantic Off-Shoulder Dress",
    price: 5200,
    stock: 6,
    sizes: ["S", "M", "L", "XL"],
    category: "Cocktail",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Feminine off-shoulder silhouette crafted from breathable fluid fabric."
  },
  {
    name: "Modern Minimalist Dress",
    price: 3900,
    stock: 10,
    sizes: ["XS", "S", "M", "L"],
    category: "Casual",
    media: [
      { 
        url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80", 
        type: "image" 
      },
      {
        url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Clean lines and a contemporary minimalist cut for effortless everyday wear."
  },
  {
    name: "Satin Cowl Neck Dress",
    price: 6800,
    stock: 6,
    sizes: ["S", "M", "L", "XL"],
    category: "Evening",
    media: [
      {
        url: "https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?auto=format&fit=crop&w=800&q=80",
        type: "image"
      },
      {
        url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Fluid satin dress with a softly draped neckline for dinner dates and formal events."
  },
  {
    name: "Linen Button-Front Dress",
    price: 3600,
    stock: 11,
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Linen",
    media: [
      {
        url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
        type: "image"
      },
      {
        url: "https://images.unsplash.com/photo-1506629905607-d9b1a2e9c3a0?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Lightweight natural linen day dress featuring button-down detailing."
  },
  {
    name: "Emerald Pleated Midi Dress",
    price: 5900,
    stock: 4,
    sizes: ["S", "M", "L"],
    category: "Cocktail",
    media: [
      {
        url: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=800&q=80",
        type: "image"
      },
      {
        url: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
        type: "image"
      }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    description: "Rich emerald jewel-toned pleated midi dress with fluid movement."
  }
];

async function seedDatabase() {
  console.log('\n========================================');
  console.log('  SEEDING DATABASE WITH SAMPLE DRESSES');
  console.log('========================================\n');
  
  try {
    console.log('⏳ Connecting to Firestore emulator...');
    console.log('   Host: 127.0.0.1:8085\n');

    const batch = db.batch();
    let count = 0;

    for (const dress of sampleDresses) {
      const dressRef = db.collection('dresses').doc();
      batch.set(dressRef, dress);
      count++;
      console.log(`✓ Added: ${dress.name} (${dress.media.length} photos) - (KSh ${dress.price.toLocaleString()})`);
    }

    await batch.commit();

    console.log('\n========================================');
    console.log(`  ✅ SUCCESS! Added ${count} multi-photo dresses`);
    console.log('========================================\n');
    console.log('🌐 Visit http://localhost:3000 to see them!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\n⚠️  Make sure Firebase Emulators are running!');
    console.error('   Run: npm run serve\n');
    process.exit(1);
  }
}

seedDatabase();
