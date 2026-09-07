'use client';

import { useState, memo, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Media } from '@/types';

interface GalleryProps {
  media: Media[];
  dressName: string;
  priority?: boolean;
  onClick?: () => void;
}

function Gallery({ media, dressName, priority = false, onClick }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const mediaLength = media?.length || 0;

  const handlePrevious = useCallback(() => {
    if (mediaLength <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? mediaLength - 1 : prev - 1));
    setImageLoaded(false);
  }, [mediaLength]);

  const handleNext = useCallback(() => {
    if (mediaLength <= 1) return;
    setCurrentIndex((prev) => (prev === mediaLength - 1 ? 0 : prev + 1));
    setImageLoaded(false);
  }, [mediaLength]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!media || media.length === 0) {
    return (
      <div 
        onClick={onClick}
        className={`relative w-full h-80 bg-gray-200 flex items-center justify-center ${onClick ? 'cursor-pointer' : ''}`}
      >
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  const currentMedia = media[currentIndex] || media[0];

  return (
    <div 
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-80 bg-stone-100 group overflow-hidden select-none ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {currentMedia.type === 'image' ? (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
              <div className="spinner"></div>
            </div>
          )}
          <Image
            src={currentMedia.url}
            alt={`${dressName} - view ${currentIndex + 1}`}
            fill
            className={`object-cover group-hover:scale-105 transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority && currentIndex === 0}
            loading={priority && currentIndex === 0 ? 'eager' : 'lazy'}
            onLoad={() => setImageLoaded(true)}
          />
        </>
      ) : (
        <video
          src={currentMedia.url}
          className="w-full h-full object-cover"
          controls
          loop
          preload="metadata"
        />
      )}

      {/* Multiple Images Navigation Controls */}
      {mediaLength > 1 && (
        <>
          {/* Left Arrow Button (Always Visible) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-900/75 hover:bg-stone-900 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20"
            aria-label="Previous photo"
            title="Previous photo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button (Always Visible) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-900/75 hover:bg-stone-900 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20"
            aria-label="Next photo"
            title="Next photo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Count Pill Badge (e.g. "1/3") */}
          <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-sm text-[11px] font-semibold text-white tracking-wide border border-white/10 pointer-events-none">
            {currentIndex + 1} / {mediaLength}
          </div>

          {/* Bottom Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            {media.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setImageLoaded(false);
                }}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'bg-primary w-5 h-2 shadow-sm'
                    : 'bg-white/60 hover:bg-white w-2 h-2'
                }`}
                aria-label={`Jump to photo ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Memoize Gallery component
export default memo(Gallery);
