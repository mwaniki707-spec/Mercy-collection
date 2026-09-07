// Cart state management using Zustand - optimized for performance
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Dress } from '@/types';

// Selectors for better performance (prevent unnecessary re-renders)
const selectItems = (state: CartStore) => state.items;
const selectItemCount = (state: CartStore) => state.getItemCount();
const selectTotal = (state: CartStore) => state.getTotal();

interface CartStore {
  items: CartItem[];
  addItem: (dress: Dress & { selectedSize?: string }) => void;
  removeItem: (dressId: string) => void;
  updateQuantity: (dressId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (dress: Dress & { selectedSize?: string }) => {
        const items = get().items;
        // Find existing item with same ID AND same size
        const existingItem = items.find(
          item => item.id === dress.id && item.selectedSize === dress.selectedSize
        );

        if (existingItem) {
          // Check stock availability
          if (existingItem.quantity >= dress.stock) {
            alert('Cannot add more items than available in stock');
            return;
          }
          set({
            items: items.map(item =>
              item.id === dress.id && item.selectedSize === dress.selectedSize
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            ...dress,
            quantity: 1,
            image: dress.media?.[0]?.url || '',
            selectedSize: dress.selectedSize,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (dressId: string) => {
        set({ items: get().items.filter(item => item.id !== dressId) });
      },

      updateQuantity: (dressId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(dressId);
          return;
        }

        const items = get().items;
        const item = items.find(i => i.id === dressId);
        
        if (item && quantity > item.stock) {
          alert('Cannot add more items than available in stock');
          return;
        }

        set({
          items: items.map(item =>
            item.id === dressId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'mercy-cart-storage',
      storage: createJSONStorage(() => localStorage),
      // Optimize storage performance
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Export selectors for optimized component subscriptions
export { selectItems, selectItemCount, selectTotal };

