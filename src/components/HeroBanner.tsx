'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroBannerProps {
  onSelectCategory?: (category: string) => void;
}

function HeroBanner({ onSelectCategory }: HeroBannerProps) {
  const scrollToCatalog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOccasionClick = (occasion: string) => {
    if (onSelectCategory) {
      onSelectCategory(occasion);
    }
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden mb-10 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white shadow-2xl border border-amber-900/30">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Hero Split */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14">
        {/* Left text column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            ✨ Nairobi&apos;s Premier Boutique Collection
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight text-stone-100">
            Elegance Tailored for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-primary to-amber-400">Every Moment</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-xl font-light leading-relaxed">
            Discover curated designer gowns, effortless daytime chic, and timeless evening silhouettes designed for Nairobi&apos;s modern women.
          </p>

          {/* Quick CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#catalog-section"
              onClick={scrollToCatalog}
              className="btn bg-primary text-dark font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-primary/30 flex items-center gap-2 px-6 py-3.5"
            >
              <span>Explore Collection</span>
              <span>↓</span>
            </a>
            <a
              href="https://wa.me/254114335365?text=Hi%20Mercy%20Collections!%20I'd%20like%20styling%20advice%20for%20an%20outfit."
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-2 border-stone-600 hover:border-amber-400 text-stone-200 hover:text-white bg-stone-800/60 backdrop-blur-sm transition-all duration-300 flex items-center gap-2 px-5 py-3.5"
            >
              <span>💬 Style Consultation</span>
            </a>
          </div>

          {/* Popular Curated Categories Fast-Clicks */}
          <div className="pt-4 border-t border-stone-800">
            <p className="text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
              Popular Occasions:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '👗 Evening Gowns', key: 'Evening' },
                { label: '🌸 Summer Maxi', key: 'Maxi' },
                { label: '💼 Office Wrap', key: 'Office' },
                { label: '✨ Cocktail & Party', key: 'Cocktail' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleOccasionClick(item.key)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-amber-500/20 hover:border-amber-400/40 border border-stone-700 text-stone-300 hover:text-amber-200 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right visual card showcase */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 relative">
          <div className="space-y-3 sm:space-y-4">
            <div className="relative h-44 sm:h-56 rounded-xl overflow-hidden shadow-xl group border border-amber-900/40">
              <Image
                src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80"
                alt="African woman in elegant evening dress"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-semibold text-amber-200">Gala & Red Carpet</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/60 backdrop-blur-sm">
              <p className="text-xs text-amber-300 font-semibold">✨ Premium Fit</p>
              <p className="text-[11px] text-stone-300 mt-0.5">Sizes XS to XXL Available</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-600/30 to-stone-800 border border-amber-500/30 backdrop-blur-sm">
              <p className="text-lg font-bold text-amber-200 font-display">KSh 2,800+</p>
              <p className="text-[11px] text-stone-300">Affordable Nairobi Luxury</p>
            </div>
            <div className="relative h-44 sm:h-56 rounded-xl overflow-hidden shadow-xl group border border-amber-900/40">
              <Image
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80"
                alt="African woman in vibrant chic boutique dress"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-semibold text-amber-200">Chic & Day Wear</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Badges Footer Bar */}
      <div className="border-t border-stone-800 bg-stone-950/70 backdrop-blur-md px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🚚</span>
          <div>
            <p className="font-semibold text-stone-200">Express Delivery</p>
            <p className="text-[10px] text-stone-400">Nairobi & Kenya-wide</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-lg">✨</span>
          <div>
            <p className="font-semibold text-stone-200">Quality Assured</p>
            <p className="text-[10px] text-stone-400">Premium Fabrics</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-lg">💬</span>
          <div>
            <p className="font-semibold text-stone-200">WhatsApp Help</p>
            <p className="text-[10px] text-stone-400">Instant Sizing Advice</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🔒</span>
          <div>
            <p className="font-semibold text-stone-200">M-Pesa Verified</p>
            <p className="text-[10px] text-stone-400">Safe & Instant Pay</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HeroBanner);
