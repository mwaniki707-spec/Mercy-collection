'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    router.push('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const itemsList = items
      .map((item) => {
        const sizePart = item.selectedSize ? ` (Size: ${item.selectedSize})` : '';
        return `${item.quantity}x ${item.name}${sizePart} - KSh ${(item.price * item.quantity).toLocaleString()}`;
      })
      .join('\n');
    
    const imageLinks = items
      .filter((item) => item.image)
      .map((item) => `${item.name}: ${item.image}`)
      .join('\n');
    
    let message = `Hi! I'd like to order:\n\n${itemsList}\n\nTotal: KSh ${getTotal().toLocaleString()}`;
    
    if (imageLinks) {
      message += `\n\nProduct images:\n${imageLinks}`;
    }
    
    message += `\n\n📦 New order from Mercy Collections website!`;
    
    const whatsappUrl = `https://wa.me/254114335365?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-dark-gray mb-8">
            Add some beautiful dresses to your cart!
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6 sm:mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card p-4 flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
                <Image
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                {item.selectedSize && (
                  <p className="text-sm text-dark-gray mb-1">
                    Size: <span className="font-semibold">{item.selectedSize}</span>
                  </p>
                )}
                <p className="text-primary font-bold mb-2">
                  KSh {item.price.toLocaleString()}
                </p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                  <span className="ml-4 text-sm text-dark-gray">
                    ({item.stock} available)
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <p className="font-bold text-lg">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => {
                    // Remove item by matching both id and size
                    const itemToRemove = items.find(
                      i => i.id === item.id && i.selectedSize === item.selectedSize
                    );
                    if (itemToRemove) removeItem(item.id);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-display font-bold mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>KSh {getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-dark-gray">
                <span>Items</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">
                  KSh {getTotal().toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full mb-2"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="btn btn-whatsapp w-full mb-2"
            >
              📱 Order via WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="btn btn-secondary w-full"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

