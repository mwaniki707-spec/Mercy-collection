'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { Dress } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface QuickViewModalProps {
  dress: Dress | null;
  onClose: () => void;
}

function QuickViewModal({ dress, onClose }: QuickViewModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedNotification, setAddedNotification] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Reset state when dress changes
  useEffect(() => {
    if (dress) {
      setCurrentMediaIndex(0);
      setSelectedSize(dress.sizes?.[0] || '');
      setQuantity(1);
      setAddedNotification(false);
      setShowSizeGuide(false);
      setSizeError(false);
    }
  }, [dress]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (dress) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [dress]);

  if (!dress) return null;

  const isOutOfStock = dress.stock === 0;
  const hasSizes = Boolean(dress.sizes && dress.sizes.length > 0);
  const currentMedia = dress.media?.[currentMediaIndex] || {
    url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    type: 'image' as const,
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        ...dress,
        selectedSize: selectedSize || undefined,
      });
    }

    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    let message = `Hi Mercy Collections! I'm interested in ordering:\n\n👗 ${dress.name}\n💰 Price: KSh ${dress.price.toLocaleString()}`;
    if (selectedSize) {
      message += `\n📏 Size: ${selectedSize}`;
    }
    if (quantity > 1) {
      message += `\n📦 Quantity: ${quantity} (Total: KSh ${(dress.price * quantity).toLocaleString()})`;
    }
    const imageUrl = dress.media?.find((m) => m.type === 'image')?.url;
    if (imageUrl) {
      message += `\n\nProduct Photo: ${imageUrl}`;
    }

    const whatsappUrl = `https://wa.me/254114335365?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click-outside backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 md:bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors shadow-sm"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Column: Media Gallery */}
        <div className="md:w-1/2 bg-stone-900 flex flex-col relative">
          <div className="relative h-72 sm:h-96 md:h-full min-h-[300px] w-full flex items-center justify-center">
            {currentMedia.type === 'image' ? (
              <Image
                src={currentMedia.url}
                alt={dress.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <video
                src={currentMedia.url}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
              />
            )}

            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="px-4 py-2 bg-red-600 text-white font-bold tracking-widest text-sm rounded-md">
                  OUT OF STOCK
                </span>
              </div>
            )}
          </div>

          {/* Media Thumbnails */}
          {dress.media && dress.media.length > 1 && (
            <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2 p-2 bg-gradient-to-t from-black/80 to-transparent">
              {dress.media.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMediaIndex(idx)}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentMediaIndex
                      ? 'border-primary scale-105 shadow-md'
                      : 'border-white/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={media.url}
                    alt={`Thumb ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  {media.type === 'video' && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[10px]">
                      ▶
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-[85vh] flex flex-col justify-between">
          <div className="space-y-4">
            {/* Badges & Category */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                {dress.category || 'Luxury Collection'}
              </span>
              <span
                className={`text-xs font-medium ${
                  isOutOfStock ? 'text-accent' : 'text-green-700 font-semibold'
                }`}
              >
                {isOutOfStock ? '● Out of Stock' : `● ${dress.stock} Available in Stock`}
              </span>
            </div>

            {/* Dress Title & Price */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 leading-tight">
                {dress.name}
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-primary mt-2">
                KSh {dress.price.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 leading-relaxed">
              {dress.description ||
                'Crafted with premium breathable fabric, designed for an elegant and comfortable silhouette that turns heads on every occasion.'}
            </p>

            {/* Size Selection */}
            {hasSizes && !isOutOfStock && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Select Your Size:
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-primary hover:text-primary-dark font-medium underline"
                  >
                    {showSizeGuide ? 'Hide Size Chart' : '📏 Size Guide'}
                  </button>
                </div>

                {/* Size Pills */}
                <div className="flex flex-wrap gap-2">
                  {dress.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`min-w-[44px] h-10 px-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-dark shadow-md scale-105'
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {sizeError && (
                  <p className="text-accent text-xs font-semibold mt-1.5 animate-bounce">
                    ⚠️ Please select a size before adding to cart
                  </p>
                )}

                {/* Interactive Size Guide Table Popover */}
                {showSizeGuide && (
                  <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
                    <p className="font-bold text-stone-800">Boutique Size Reference (Inches):</p>
                    <div className="grid grid-cols-4 gap-1 text-center font-medium bg-white p-2 rounded-lg border border-amber-100">
                      <span className="text-stone-400">Size</span>
                      <span className="text-stone-400">Bust</span>
                      <span className="text-stone-400">Waist</span>
                      <span className="text-stone-400">Hips</span>

                      <span className="font-bold">S (8)</span>
                      <span>33-34 in</span>
                      <span>26-27 in</span>
                      <span>36-37 in</span>

                      <span className="font-bold">M (10)</span>
                      <span>35-36 in</span>
                      <span>28-29 in</span>
                      <span>38-39 in</span>

                      <span className="font-bold">L (12)</span>
                      <span>37-39 in</span>
                      <span>30-32 in</span>
                      <span>40-42 in</span>

                      <span className="font-bold">XL (14)</span>
                      <span>40-42 in</span>
                      <span>33-35 in</span>
                      <span>43-45 in</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Stepper */}
            {!isOutOfStock && (
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(dress.stock, q + 1))}
                    disabled={quantity >= dress.stock}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-sm font-bold disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions & Feedback */}
          <div className="space-y-2.5 pt-6 border-t border-stone-200 mt-6">
            {!isOutOfStock && (
              <button
                onClick={handleAddToCart}
                className="btn btn-primary w-full py-3.5 font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>🛍️ Add to Cart</span>
                <span>•</span>
                <span>KSh {(dress.price * quantity).toLocaleString()}</span>
              </button>
            )}

            <button
              onClick={handleWhatsAppOrder}
              className="btn btn-whatsapp w-full py-3 font-semibold flex items-center justify-center gap-2"
            >
              <span>📱 Inquire / Order via WhatsApp</span>
            </button>

            {addedNotification && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-center rounded-xl text-xs font-semibold animate-pulse">
                ✓ Added {quantity}x {dress.name} {selectedSize ? `(Size ${selectedSize})` : ''} to your cart!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(QuickViewModal);
