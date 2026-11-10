import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  basePrice: number;
  quantity: number;
  estoqueMax: number;
  imageUrl?: string;
  category?: string;
  line?: string;
  subcategory?: string; // <--- Adicionado para suportar acessórios
  extraId?: string;
  extraName?: string;
  extraPrice?: number;
  observacao?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  
  addItem: (newItem) => set((state) => {
    const existingItemIndex = state.items.findIndex(
      (item) => 
        item.productId === newItem.productId && 
        item.extraId === newItem.extraId &&
        item.observacao === newItem.observacao
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...state.items];
      const currentItem = updatedItems[existingItemIndex];
      
      const novaQuantidade = currentItem.quantity + newItem.quantity;
      if (novaQuantidade <= newItem.estoqueMax) {
        currentItem.quantity = novaQuantidade;
      } else {
        currentItem.quantity = newItem.estoqueMax; 
      }
      
      return { items: updatedItems, isOpen: true };
    }

    const quantidadeValidada = Math.min(newItem.quantity, newItem.estoqueMax);
    
    return { 
      items: [...state.items, { ...newItem, quantity: quantidadeValidada }],
      isOpen: true
    };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) => {
      if (item.id === id) {
        const qtdValidada = Math.max(1, Math.min(quantity, item.estoqueMax));
        return { ...item, quantity: qtdValidada };
      }
      return item;
    })
  })),

  clearCart: () => set({ items: [] })
}));