'use client';

import { memo, useMemo } from 'react';

export interface FilterState {
  search: string;
  category: string;
  size: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'in-stock-only';
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  availableSizes?: string[];
  isOpen: boolean;
  onCloseMobile?: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Styles', icon: '✨' },
  { id: 'Evening', label: 'Evening & Gala', icon: '👗' },
  { id: 'Maxi', label: 'Maxi & Beach', icon: '☀️' },
  { id: 'Casual', label: 'Casual & Day', icon: '🌸' },
  { id: 'Office', label: 'Office & Wrap', icon: '💼' },
  { id: 'Cocktail', label: 'Cocktail & Party', icon: '🍸' },
  { id: 'Linen', label: 'Linen & Minimal', icon: '🌿' },
];

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '8', '10', '12', '14', '16'];

function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  availableSizes = DEFAULT_SIZES,
  isOpen,
  onCloseMobile,
}: FilterSidebarProps) {
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category !== 'all') count++;
    if (filters.size !== 'all') count++;
    if (filters.sortBy !== 'featured') count++;
    return count;
  }, [filters]);

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header with Title & Reset Button */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎛️</span>
          <h3 className="font-display font-bold text-lg text-stone-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-bold bg-primary text-dark rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-accent hover:text-red-700 font-semibold transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* 1. Search Box */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
          Search Dress
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Search by name, color..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-xs bg-stone-50/50"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-600 text-xs"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. Sort By */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
          className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
        >
          <option value="featured">✨ Featured (In Stock)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="in-stock-only">In Stock Only</option>
        </select>
      </div>

      {/* 3. Occasion / Category (Vertical List) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
          Occasion & Style
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ category: cat.id })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 text-left ${
                  isSelected
                    ? 'bg-stone-900 text-amber-300 shadow-sm font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </div>
                {isSelected && <span className="text-primary text-xs">●</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Size Filter (Grid of Pills) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Size
          </label>
          {filters.size !== 'all' && (
            <button
              onClick={() => onFilterChange({ size: 'all' })}
              className="text-[11px] text-primary hover:underline font-medium"
            >
              Reset Size
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => onFilterChange({ size: 'all' })}
            className={`col-span-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              filters.size === 'all'
                ? 'bg-primary text-dark border-primary shadow-sm'
                : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-400'
            }`}
          >
            All Sizes
          </button>
          {availableSizes.map((size) => {
            const isSelected = filters.size === size;
            return (
              <button
                key={size}
                onClick={() => onFilterChange({ size: isSelected ? 'all' : size })}
                className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-primary text-dark border-primary shadow-sm scale-105'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-primary'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Badge */}
      <div className="pt-4 border-t border-stone-200 text-center">
        <p className="text-xs text-stone-500">
          Showing <strong className="text-stone-900 font-bold">{totalResults}</strong> {totalResults === 1 ? 'dress' : 'dresses'}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Left side, collapsible) */}
      <aside
        className={`hidden md:block transition-all duration-300 ease-in-out ${
          isOpen
            ? 'w-64 lg:w-72 opacity-100 flex-shrink-0'
            : 'w-0 opacity-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-stone-200/80 p-5">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          ></div>

          {/* Drawer content */}
          <div className="relative z-10 w-4/5 max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                <span className="font-display font-bold text-lg text-stone-900">Filter Dresses</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 text-sm"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
              {sidebarContent}
            </div>

            <div className="pt-4 mt-6 border-t border-stone-200">
              <button
                onClick={onCloseMobile}
                className="btn btn-primary w-full py-3 text-xs font-bold shadow-md"
              >
                Show {totalResults} {totalResults === 1 ? 'Dress' : 'Dresses'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(FilterSidebar);
