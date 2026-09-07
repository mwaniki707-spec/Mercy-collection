// Type definitions for Mercy Collections

export interface Media {
  url: string;
  type: 'image' | 'video';
}

export interface Dress {
  id: string;
  name: string;
  price: number;
  stock: number;
  media: Media[];
  sizes?: string[]; // Available sizes (e.g., ['S', 'M', 'L', 'XL'])
  description?: string;
  category?: string;
  gender?: string; // 'Women' | 'Girls' | 'Unisex' | 'Men'
  createdAt?: any; // Firestore Timestamp
  updatedAt?: any; // Firestore Timestamp
}

export interface CartItem extends Dress {
  quantity: number;
  image?: string; // First media URL for display
  selectedSize?: string; // Size selected by customer
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string | null;
  phone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: any; // Firestore Timestamp
  paymentMethod: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: 'customer' | 'admin';
  createdAt: Date;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

