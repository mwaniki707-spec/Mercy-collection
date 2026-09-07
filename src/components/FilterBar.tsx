'use client';

import { memo, useMemo } from 'react';

export interface FilterState {
  search: string;
  category: string;
  gender: string;
  size: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'in-stock-only';
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  availableSizes?: string[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Styles' },
  { id: 'Evening', label: '👗 Evening & Gala' },
  { id: 'Maxi', label: '☀️ Maxi & Beach' },
  { id: 'Casual', label: '🌸 Casual & Day' },
  { id: 'Office', label: '💼 Office & Wrap' },
  { id: 'Cocktail', label: '✨ Cocktail & Party' },
  { id: 'Linen', label: '🌿 Linen & Minimal' },
];

const GENDERS = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'girls', label: 'Girls / Teens' },
  { id: 'unisex', label: 'Unisex' },
];

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '8', '10', '12', '14', '16'];

function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  availableSizes = DEFAULT_SIZES,
}: FilterBarProps) {
  const hasActiveFilters = useMemo(() => {
    return (
      Boolean(filters.search.trim()) ||
      filters.category !== 'all' ||
      filters.gender !== 'all' ||
      filters.size !== 'all' ||
      filters.sortBy !== 'featured'
    );
  }, [filters]);

  return (
    <div id="catalog-section" className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-4 sm:p-6 mb-8">
      {/* Top row: Search input & Sort dropdown */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-5 border-b border-stone-100">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Search dresses by name, color, style..."
            className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex-shrink-0">
            Sort by:
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer"
          >
            <option value="featured">✨ Featured (In Stock)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="in-stock-only">In Stock Only</option>
          </select>
        </div>
      </div>

      {/* Filter Row 1: Occasion / Style Pills */}
      <div className="py-4 border-b border-stone-100">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Occasion / Style:
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id })}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                filters.category === cat.id
                  ? 'bg-dark text-amber-300 shadow-sm border border-dark scale-105'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700 border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Row 2: Gender & Size Quick-Filters */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Gender / Audience */}
        <div className="md:col-span-4 flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex-shrink-0">
            Gender:
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {GENDERS.map((g) => (
              <button
                key={g.id}
                onClick={() => onFilterChange({ gender: g.id })}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filters.gender === g.id
                    ? 'bg-primary text-dark font-semibold shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size Chips */}
        <div className="md:col-span-8 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex-shrink-0">
            Size:
          </span>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => onFilterChange({ size: 'all' })}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                filters.size === 'all'
                  ? 'bg-primary text-dark font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              All
            </button>
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => onFilterChange({ size: size === filters.size ? 'all' : size })}
                className={`min-w-[28px] px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  filters.size === size
                    ? 'bg-primary text-dark font-semibold shadow-sm ring-2 ring-primary/40'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Summary & Clear Button */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100 text-xs">
        <span className="text-stone-500 font-medium">
          Showing <strong className="text-dark font-bold">{totalResults}</strong> {totalResults === 1 ? 'dress' : 'dresses'}
        </span>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-accent hover:text-red-700 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>✕ Reset all filters</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(FilterBar);
