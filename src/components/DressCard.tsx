'use client';

import { useState, memo, useCallback } from 'react';
import Image from 'next/image';
import { Dress } from '@/types';
import { useCartStore } from '@/store/cartStore';
import Gallery from './Gallery';

interface DressCardProps {
  dress: Dress;
  priority?: boolean;
  onQuickView?: (dress: Dress) => void;
}

function DressCard({ dress, priority = false, onQuickView }: DressCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showSizeError, setShowSizeError] = useState(false);
  const isOutOfStock = dress.stock === 0;
  const isLowStock = dress.stock > 0 && dress.stock <= 4;
  const hasSizes = Boolean(dress.sizes && dress.sizes.length > 0);

  const toggleSize = useCallback((size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
    setShowSizeError(false);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (isOutOfStock) return;
    
    if (hasSizes && selectedSizes.length === 0) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 3000);
      return;
    }
    
    if (hasSizes) {
      selectedSizes.forEach(size => {
        addItem({ ...dress, selectedSize: size });
      });
      setNotificationCount(selectedSizes.length);
    } else {
      addItem(dress);
      setNotificationCount(1);
    }
    
    setShowNotification(true);
    setSelectedSizes([]);
    setTimeout(() => setShowNotification(false), 2000);
  }, [isOutOfStock, hasSizes, selectedSizes, addItem, dress]);

  const handleWhatsAppOrder = useCallback(() => {
    let message = `Hi Mercy Collections! I'm interested in: ${dress.name} (KSh ${dress.price.toLocaleString()})`;
    
    if (hasSizes && selectedSizes.length > 0) {
      message += `\nSize(s): ${selectedSizes.join(', ')}`;
    } else if (hasSizes) {
      message += `\nAvailable sizes: ${dress.sizes?.join(', ')}`;
    }
    
    const imageUrl = dress.media?.find(m => m.type === 'image')?.url;
    if (imageUrl) {
      message += `\n\nProduct photo: ${imageUrl}`;
    }
    
    const whatsappUrl = `https://wa.me/254114335365?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [dress.name, dress.price, dress.sizes, dress.media, hasSizes, selectedSizes]);

  return (
    <div className="card group flex flex-col justify-between border border-stone-200/70 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden bg-white">
      <div>
        {/* Media & Badges Container */}
        <div className="relative overflow-hidden">
          <Gallery 
            media={dress.media} 
            dressName={dress.name} 
            priority={priority} 
            onClick={() => onQuickView && onQuickView(dress)}
          />

          {/* Quick View Button overlay */}
          {onQuickView && (
            <button
              onClick={() => onQuickView(dress)}
              className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-800 text-xs font-semibold shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 flex items-center gap-1.5"
            >
              <span>👁️</span>
              <span className="hidden sm:inline">Quick View</span>
            </button>
          )}

          {/* Stock Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
            {isOutOfStock ? (
              <span className="px-2.5 py-1 bg-red-600/90 text-white text-[11px] font-bold rounded-full uppercase tracking-wider backdrop-blur-sm">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="px-2.5 py-1 bg-amber-500/90 text-white text-[11px] font-bold rounded-full uppercase tracking-wider backdrop-blur-sm animate-pulse">
                Only {dress.stock} Left!
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-stone-900/80 text-amber-300 text-[11px] font-semibold rounded-full backdrop-blur-sm">
                In Stock
              </span>
            )}
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <span className="text-white text-lg font-bold tracking-widest px-4 py-1.5 border-2 border-white/60 rounded">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
        
        {/* Details */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 
              onClick={() => onQuickView && onQuickView(dress)}
              className="text-lg font-display font-semibold text-stone-900 line-clamp-1 hover:text-primary transition-colors cursor-pointer"
            >
              {dress.name}
            </h3>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-primary">
              KSh {dress.price.toLocaleString()}
            </span>
          </div>

          {/* Size Selection */}
          {hasSizes && !isOutOfStock && (
            <div className="mb-4 p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/60">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  Select Size:
                </label>
                {onQuickView && (
                  <button
                    onClick={() => onQuickView(dress)}
                    className="text-[11px] text-primary hover:underline font-medium"
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {dress.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`min-w-[32px] px-2 py-1 rounded-md text-xs font-semibold border transition-all ${
                      selectedSizes.includes(size)
                        ? 'border-primary bg-primary text-dark shadow-sm'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSizes.length > 0 && (
                <p className="text-[11px] text-primary font-semibold mt-1.5">
                  ✓ Selected: {selectedSizes.join(', ')}
                </p>
              )}
              {showSizeError && (
                <p className="text-accent text-xs font-semibold mt-1.5 animate-bounce">
                  ⚠️ Please select a size
                </p>
              )}
            </div>
          )}

          {/* Available sizes hint if out of stock */}
          {hasSizes && isOutOfStock && (
            <p className="text-xs text-stone-500 mb-3">
              <span className="font-medium">Sizes:</span> {dress.sizes?.join(', ')}
            </p>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="flex flex-col sm:flex-row gap-2">
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 text-xs sm:text-sm font-semibold py-2.5 shadow-sm hover:shadow"
            >
              Add to Cart
            </button>
          )}
          <button
            onClick={handleWhatsAppOrder}
            className={`btn btn-whatsapp text-xs sm:text-sm font-semibold py-2.5 ${isOutOfStock ? 'flex-1' : ''}`}
          >
            Order on WhatsApp 📱
          </button>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-bounce text-sm font-semibold flex items-center gap-2">
          <span>✓</span>
          <span>Added to cart!{notificationCount > 1 && ` (${notificationCount} sizes)`}</span>
        </div>
      )}
    </div>
  );
}

export default memo(DressCard, (prevProps, nextProps) => {
  return prevProps.dress.id === nextProps.dress.id &&
         prevProps.dress.stock === nextProps.dress.stock &&
         prevProps.dress.price === nextProps.dress.price &&
         prevProps.onQuickView === nextProps.onQuickView;
});
