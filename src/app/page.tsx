'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cache } from '@/lib/cache';
import { Dress } from '@/types';
import DressCard from '@/components/DressCard';
import HeroBanner from '@/components/HeroBanner';
import FilterSidebar, { FilterState } from '@/components/FilterSidebar';
import QuickViewModal from '@/components/QuickViewModal';

const INITIAL_FILTERS: FilterState = {
  search: '',
  category: 'all',
  size: 'all',
  sortBy: 'featured',
};

export default function HomePage() {
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [quickViewDress, setQuickViewDress] = useState<Dress | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  // Fetch dresses from Firestore or cache
  const fetchDresses = useCallback(async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        const cachedDresses = cache.get<Dress[]>('dresses');
        if (cachedDresses) {
          setDresses(cachedDresses);
          setLoading(false);
          return;
        }
      }

      const dressesRef = collection(db, 'dresses');
      const q = query(dressesRef, orderBy('createdAt', 'desc'));
      
      const snapshot = await getDocs(q);
      const dressData: Dress[] = [];
      
      snapshot.forEach((doc) => {
        dressData.push({
          id: doc.id,
          ...doc.data(),
        } as Dress);
      });

      // Default sort: in-stock first
      dressData.sort((a, b) => {
        if (a.stock > 0 && b.stock === 0) return -1;
        if (a.stock === 0 && b.stock > 0) return 1;
        return 0;
      });

      cache.set('dresses', dressData, 60000);
      setDresses(dressData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading dresses:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDresses();
    const interval = setInterval(() => fetchDresses(true), 60000);
    return () => clearInterval(interval);
  }, [fetchDresses]);

  const handleFilterChange = useCallback((updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // Compute all available unique sizes across all dresses
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    dresses.forEach((d) => {
      if (Array.isArray(d.sizes)) {
        d.sizes.forEach((s) => sizeSet.add(s));
      }
    });
    return Array.from(sizeSet);
  }, [dresses]);

  // Filter and Sort dresses
  const filteredDresses = useMemo(() => {
    let result = [...dresses];

    // 1. Search Query (matches name or description)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.description && d.description.toLowerCase().includes(q))
      );
    }

    // 2. Category / Occasion Filter
    if (filters.category !== 'all') {
      const cat = filters.category.toLowerCase();
      result = result.filter((d) => {
        if (d.category && d.category.toLowerCase().includes(cat)) return true;
        if (d.name.toLowerCase().includes(cat)) return true;
        if (d.description && d.description.toLowerCase().includes(cat)) return true;
        return false;
      });
    }

    // 3. Size Filter
    if (filters.size !== 'all') {
      result = result.filter(
        (d) => Array.isArray(d.sizes) && d.sizes.includes(filters.size)
      );
    }

    // 4. Sort By
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'in-stock-only':
        result = result.filter((d) => d.stock > 0);
        break;
      case 'featured':
      default:
        result.sort((a, b) => {
          if (a.stock > 0 && b.stock === 0) return -1;
          if (a.stock === 0 && b.stock > 0) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [dresses, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category !== 'all') count++;
    if (filters.size !== 'all') count++;
    if (filters.sortBy !== 'featured') count++;
    return count;
  }, [filters]);

  return (
    <div className="container py-6 sm:py-8">
      {/* Luxury Editorial Hero Banner */}
      <HeroBanner
        onSelectCategory={(category) => {
          handleFilterChange({ category });
          setShowFilters(true);
        }}
      />

      {/* Catalog Section with Toolbar & Side-by-Side Layout */}
      <div id="catalog-section" className="pt-2">
        {/* Top Control Bar: Toggle Button + Active Filter Chips + Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl shadow-sm border border-stone-200/80 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                showFilters
                  ? 'bg-stone-900 text-amber-300 shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              <span>🎛️</span>
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-dark rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Quick Active Filter Badges */}
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
                <span>Occasion: <strong>{filters.category}</strong></span>
                <button
                  onClick={() => handleFilterChange({ category: 'all' })}
                  className="hover:text-accent font-bold"
                  aria-label="Remove category filter"
                >
                  ✕
                </button>
              </span>
            )}

            {filters.size !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
                <span>Size: <strong>{filters.size}</strong></span>
                <button
                  onClick={() => handleFilterChange({ size: 'all' })}
                  className="hover:text-accent font-bold"
                  aria-label="Remove size filter"
                >
                  ✕
                </button>
              </span>
            )}

            {filters.search.trim() && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
                <span>&quot;{filters.search}&quot;</span>
                <button
                  onClick={() => handleFilterChange({ search: '' })}
                  className="hover:text-accent font-bold"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              </span>
            )}
          </div>

          {/* Results Summary */}
          <div className="text-xs text-stone-500 font-medium">
            Showing <strong className="text-stone-900 font-bold">{filteredDresses.length}</strong> {filteredDresses.length === 1 ? 'dress' : 'dresses'}
          </div>
        </div>

        {/* Main Content Layout: Vertical Left Sidebar + Products Grid */}
        <div className="flex gap-6 lg:gap-8 items-start">
          {/* Vertical Filter Sidebar on the left */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={filteredDresses.length}
            availableSizes={availableSizes.length > 0 ? availableSizes : undefined}
            isOpen={showFilters}
            onCloseMobile={() => setShowFilters(false)}
          />

          {/* Dresses Grid on the right (Expands when sidebar is hidden) */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center min-h-[300px]">
                <div className="spinner"></div>
                <p className="mt-4 text-dark-gray text-sm">Loading curated collection...</p>
              </div>
            ) : filteredDresses.length === 0 ? (
              <div className="card p-10 text-center max-w-md mx-auto my-8 border border-stone-200">
                <span className="text-5xl mb-4 block">🔍</span>
                <h2 className="text-2xl font-display font-bold text-stone-900 mb-2">
                  No Matching Dresses
                </h2>
                <p className="text-stone-600 text-sm mb-6">
                  We couldn&apos;t find any dresses matching your current filters. Try changing your filters or searching for something else.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn btn-primary text-xs font-bold px-6 py-2.5 shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-6 ${
                  showFilters
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}
              >
                {filteredDresses.map((dress, index) => (
                  <DressCard
                    key={dress.id}
                    dress={dress}
                    priority={index < 3}
                    onQuickView={(d) => setQuickViewDress(d)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Quick View Modal */}
      <QuickViewModal
        dress={quickViewDress}
        onClose={() => setQuickViewDress(null)}
      />
    </div>
  );
}
