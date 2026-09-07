'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { Dress, Order } from '@/types';

type TabType = 'orders' | 'products' | 'add-product';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [dresses, setDresses] = useState<Dress[]>([]);
  
  // Form state
  const [editingId, setEditingId] = useState('');
  const [dressName, setDressName] = useState('');
  const [dressPrice, setDressPrice] = useState('');
  const [dressStock, setDressStock] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingMedia, setExistingMedia] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth');
        return;
      }

      const tokenResult = await user.getIdTokenResult();
      if (!tokenResult.claims.admin) {
        alert('Access denied. Admin only.');
        router.push('/');
        return;
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (loading) return;

    // Load orders
    const ordersQuery = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );
    const unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
      const orderData: Order[] = [];
      snapshot.forEach((doc) => {
        orderData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(orderData);
    });

    // Load dresses
    const dressesQuery = query(
      collection(db, 'dresses'),
      orderBy('createdAt', 'desc')
    );
    const unsubDresses = onSnapshot(dressesQuery, (snapshot) => {
      const dressData: Dress[] = [];
      snapshot.forEach((doc) => {
        dressData.push({ id: doc.id, ...doc.data() } as Dress);
      });
      setDresses(dressData);
    });

    return () => {
      unsubOrders();
      unsubDresses();
    };
  }, [loading]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const price = Number(dressPrice);
      const stock = Number(dressStock);

      // Upload new files
      const newMedia = [];
      for (const file of selectedFiles) {
        const storageRef = ref(storage, `dresses/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        newMedia.push({
          url,
          type: file.type.startsWith('video') ? 'video' : 'image',
        });
      }

      const dressData = {
        name: dressName,
        price,
        stock,
        media: [...existingMedia, ...newMedia],
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, 'dresses', editingId), dressData);
      } else {
        await addDoc(collection(db, 'dresses'), {
          ...dressData,
          createdAt: serverTimestamp(),
        });
      }

      // Reset form
      setDressName('');
      setDressPrice('');
      setDressStock('');
      setSelectedFiles([]);
      setExistingMedia([]);
      setEditingId('');
      setActiveTab('products');
      alert('Dress saved successfully!');
    } catch (error) {
      console.error('Error saving dress:', error);
      alert('Error saving dress');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (id: string) => {
    const docRef = doc(db, 'dresses', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setDressName(data.name);
      setDressPrice(data.price.toString());
      setDressStock(data.stock.toString());
      setExistingMedia(data.media || []);
      setEditingId(id);
      setActiveTab('add-product');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this dress?')) {
      await deleteDoc(doc(db, 'dresses', id));
    }
  };

  const seedDatabase = async () => {
    if (!confirm('This will add sample dresses to the database. Continue?'))
      return;

    const sampleDresses = [
      {
        name: 'Floral Summer Maxi Dress',
        price: 3500,
        stock: 10,
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Maxi',
        description: 'Light and breezy floral maxi dress perfect for summer occasions and weekend getaways.',
        media: [
          {
            url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
            type: 'image',
          },
          {
            url: 'https://images.unsplash.com/photo-1509319117992-c4e5f6d6f8f9?auto=format&fit=crop&w=800&q=80',
            type: 'image',
          },
        ],
        createdAt: serverTimestamp(),
      },
      {
        name: 'Elegant Evening Gown',
        price: 8500,
        stock: 5,
        sizes: ['6', '8', '10', '12', '14'],
        category: 'Evening',
        description: 'Sophisticated jewel-toned evening gown with exquisite tailoring for galas and red-carpet moments.',
        media: [
          {
            url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
            type: 'image',
          },
          {
            url: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80',
            type: 'image',
          },
        ],
        createdAt: serverTimestamp(),
      },
      {
        name: 'Casual Chic Midi Dress',
        price: 4200,
        stock: 15,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'Casual',
        description: 'Versatile midi dress designed for effortless Nairobi day-to-night styling.',
        media: [
          {
            url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
            type: 'image',
          },
          {
            url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
            type: 'image',
          },
        ],
        createdAt: serverTimestamp(),
      },
    ];

    try {
      for (const dress of sampleDresses) {
        await addDoc(collection(db, 'dresses'), dress);
      }
      alert('Sample data added successfully!');
      setActiveTab('products');
    } catch (error) {
      console.error('Error seeding database:', error);
      alert('Error seeding database');
    }
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="flex flex-col items-center justify-center">
          <div className="spinner"></div>
          <p className="mt-4">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  const tabButton = (tab: TabType, label: string, emoji?: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full text-left px-4 py-2.5 rounded transition-colors ${
        activeTab === tab
          ? 'bg-primary text-dark font-semibold'
          : 'hover:bg-gray-100'
      }`}
    >
      {emoji && <span className="mr-2">{emoji}</span>}{label}
    </button>
  );

  return (
    <div className="container py-6 sm:py-8">
      {/* Mobile tab bar */}
      <div className="flex md:hidden gap-1 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'orders'
              ? 'bg-primary text-dark'
              : 'bg-gray-100 text-dark-gray hover:bg-gray-200'
          }`}
        >
          📋 Orders
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'products'
              ? 'bg-primary text-dark'
              : 'bg-gray-100 text-dark-gray hover:bg-gray-200'
          }`}
        >
          👗 Products
        </button>
        <button
          onClick={() => setActiveTab('add-product')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'add-product'
              ? 'bg-primary text-dark'
              : 'bg-gray-100 text-dark-gray hover:bg-gray-200'
          }`}
        >
          ➕ Add
        </button>
        <button
          onClick={seedDatabase}
          className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-dark-gray hover:bg-gray-200 transition-colors"
        >
          🌱 Seed
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="card p-4">
            <nav className="space-y-2">
              {tabButton('orders', 'Orders', '📋')}
              {tabButton('products', 'Products', '👗')}
              {tabButton('add-product', 'Add Product', '➕')}
              <button
                onClick={seedDatabase}
                className="w-full text-left px-4 py-2.5 rounded hover:bg-gray-100 transition-colors"
              >
                🌱 Seed Database
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 sm:mb-6">
                Recent Orders
              </h2>

              {/* Mobile: card layout */}
              <div className="space-y-4 md:hidden">
                {orders.map((order) => (
                  <div key={order.id} className="card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-sm text-dark-gray">
                        #{order.id.slice(0, 8)}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-dark-gray">Date:</span>{' '}
                        {order.createdAt?.toDate?.()?.toLocaleDateString() || 'Just now'}
                      </p>
                      <p>
                        <span className="text-dark-gray">Customer:</span>{' '}
                        {order.phone}
                      </p>
                      <p className="text-xs text-dark-gray">
                        {order.userEmail || 'Guest'}
                      </p>
                      <p>
                        <span className="text-dark-gray">Items:</span>{' '}
                        {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </p>
                      <p className="text-primary font-bold text-base pt-1">
                        KSh {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: table layout */}
              <div className="card overflow-hidden hidden md:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">Order ID</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Customer</th>
                        <th className="px-4 py-3 text-left">Items</th>
                        <th className="px-4 py-3 text-left">Total</th>
                        <th className="px-4 py-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-3">
                            #{order.id.slice(0, 8)}
                          </td>
                          <td className="px-4 py-3">
                            {order.createdAt?.toDate?.()?.toLocaleDateString() ||
                              'Just now'}
                          </td>
                          <td className="px-4 py-3">
                            {order.phone}
                            <br />
                            <small className="text-dark-gray">
                              {order.userEmail || 'Guest'}
                            </small>
                          </td>
                          <td className="px-4 py-3">
                            {order.items
                              .map((i) => `${i.quantity}x ${i.name}`)
                              .join(', ')}
                          </td>
                          <td className="px-4 py-3">
                            KSh {order.total.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 sm:mb-6">
                Manage Inventory
              </h2>
              <div className="space-y-4">
                {dresses.map((dress) => (
                  <div key={dress.id} className="card p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-20 h-40 sm:h-20 flex-shrink-0">
                      <Image
                        src={dress.media?.[0]?.url || '/placeholder.jpg'}
                        alt={dress.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">
                        {dress.name}
                      </div>
                      <div className="text-sm text-dark-gray">
                        KSh {dress.price.toLocaleString()} • Stock:{' '}
                        {dress.stock}
                      </div>
                    </div>
                    <div className="flex gap-2 sm:flex-shrink-0">
                      <button
                        onClick={() => handleEdit(dress.id)}
                        className="btn btn-secondary text-sm px-3 py-1 flex-1 sm:flex-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dress.id)}
                        className="btn btn-secondary text-sm px-3 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white flex-1 sm:flex-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add/Edit Product Tab */}
          {activeTab === 'add-product' && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 sm:mb-6">
                {editingId ? 'Edit Dress' : 'Add New Dress'}
              </h2>
              <div className="card p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="form-label">Dress Name</label>
                    <input
                      type="text"
                      value={dressName}
                      onChange={(e) => setDressName(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Price (KSh)</label>
                      <input
                        type="number"
                        value={dressPrice}
                        onChange={(e) => setDressPrice(e.target.value)}
                        className="form-input"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="form-label">Stock Quantity</label>
                      <input
                        type="number"
                        value={dressStock}
                        onChange={(e) => setDressStock(e.target.value)}
                        className="form-input"
                        required
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Images & Videos (Multiple Upload Supported)</label>
                    
                    {/* Existing Media Thumbnails */}
                    {existingMedia.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-stone-600 mb-1.5">Current Photos / Videos:</p>
                        <div className="flex gap-2 flex-wrap">
                          {existingMedia.map((m, idx) => (
                            <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-300 group">
                              <Image src={m.url} alt={`Media ${idx + 1}`} fill className="object-cover" />
                              <button
                                type="button"
                                onClick={() => setExistingMedia(prev => prev.filter((_, i) => i !== idx))}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md opacity-80 hover:opacity-100"
                                title="Remove photo"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="form-input"
                      multiple
                      accept="image/*,video/*"
                    />
                    {selectedFiles.length > 0 && (
                      <p className="text-xs text-green-700 font-semibold mt-2">
                        ✓ {selectedFiles.length} new file(s) selected for upload
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn btn-primary"
                    >
                      {saving ? 'Saving...' : 'Save Dress'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId('');
                          setDressName('');
                          setDressPrice('');
                          setDressStock('');
                          setSelectedFiles([]);
                          setExistingMedia([]);
                        }}
                        className="btn btn-secondary"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
