'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { auth, db } from '@/lib/firebase';
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isGuest = !auth?.currentUser;

  useEffect(() => {
    if (typeof window !== 'undefined' && items.length === 0 && !showSuccess) {
      router.push('/cart');
    }
  }, [items.length, showSuccess, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate STK Push delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate user entering PIN
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Create order and update stock using transaction
      await runTransaction(db, async (transaction) => {
        // Check stock for all items
        for (const item of items) {
          const dressRef = doc(db, 'dresses', item.id);
          const dressDoc = await transaction.get(dressRef);

          if (!dressDoc.exists()) {
            throw new Error(`${item.name} is no longer available`);
          }

          const currentStock = dressDoc.data().stock;
          const newStock = currentStock - item.quantity;

          if (newStock < 0) {
            throw new Error(`Insufficient stock for ${item.name}`);
          }

          // Update or delete dress based on new stock
          if (newStock === 0) {
            transaction.delete(dressRef);
          } else {
            transaction.update(dressRef, { stock: newStock });
          }
        }

        // Create order
        const orderRef = doc(collection(db, 'orders'));
        transaction.set(orderRef, {
          userId: auth?.currentUser?.uid || 'guest',
          userEmail: auth?.currentUser?.email || customerEmail || null,
          customerName: auth?.currentUser?.displayName || customerName || 'Guest',
          phone,
          items: items.map(({ id, name, price, quantity, selectedSize }) => ({
            id,
            name,
            price,
            quantity,
            selectedSize: selectedSize || null,
          })),
          total: getTotal(),
          status: 'completed',
          createdAt: serverTimestamp(),
          paymentMethod: 'M-Pesa (Simulated)',
          isGuest: !auth?.currentUser,
        });
      });

      // Clear cart and show success
      clearCart();
      setShowSuccess(true);
    } catch (error: any) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + (error.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !showSuccess) {
    router.push('/cart');
    return null;
  }

  if (showSuccess) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="card p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-display font-bold mb-4">
              Order Successful!
            </h2>
            <p className="text-dark-gray mb-4">
              Thank you for shopping with Mercy Collections.
            </p>
            <p className="text-dark-gray mb-8">
              You will receive a confirmation shortly.
            </p>
            <button
              onClick={() => router.push('/')}
              className="btn btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-center mb-6 sm:mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Order Summary */}
        <div className="card p-6">
          <h2 className="text-2xl font-display font-bold mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image || '/placeholder.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-dark-gray">
                    {item.quantity} x KSh {item.price.toLocaleString()}
                  </div>
                </div>
                <div className="font-semibold">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>KSh {getTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">
                KSh {getTotal().toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="card p-6">
          <h2 className="text-2xl font-display font-bold mb-4">
            Payment Details
          </h2>
          <p className="text-dark-gray mb-6">Secure payment via M-Pesa</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest checkout fields */}
            {isGuest && (
              <>
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="form-input"
                    placeholder="your@email.com"
                    required
                  />
                  <small className="text-dark-gray">For order confirmation</small>
                </div>
              </>
            )}

            <div>
              <label className="form-label">M-Pesa Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
                placeholder="0712345678"
                pattern="^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$"
                required
              />
              <small className="text-dark-gray">Format: 0712345678</small>
            </div>

            {isGuest && (
              <div className="alert alert-warning">
                <strong>Guest Checkout:</strong> Create an account to track your orders and get faster checkout next time.
              </div>
            )}

            <div className="alert alert-info">
              <strong>Note:</strong> This is a simulated payment. No actual
              money will be deducted.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Processing Payment...' : 'Pay with M-Pesa'}
            </button>
          </form>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className="spinner mb-4"></div>
          <p className="text-white text-lg font-semibold">
            Processing Payment...
          </p>
          <p className="text-white text-sm mt-2">
            Please check your phone and enter your M-Pesa PIN
          </p>
        </div>
      )}
    </div>
  );
}

