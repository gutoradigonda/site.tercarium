import { create } from 'zustand';

export interface CartItem {
  id: string; // ID único para o item no carrinho (caso compre o mesmo terço 2x com personalizações diferentes)
  productId: string;
  name: string;
  basePrice: number;
  quantity: number;
  extraId?: string;
  extraName?: string;
  extraPrice?: number;
  observacao?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  
  addItem: (newItem) => set((state) => {
    // Verifica se já existe um item exato (mesmo produto, extra e observação)
    const existingItemIndex = state.items.findIndex(
      (item) => 
        item.productId === newItem.productId && 
        item.extraId === newItem.extraId &&
        item.observacao === newItem.observacao
    );

    if (existingItemIndex >= 0) {
      // Se existir, apenas aumenta a quantidade
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex].quantity += newItem.quantity;
      return { items: updatedItems };
    }

    // Se for novo, adiciona à lista
    return { items: [...state.items, newItem] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),

  clearCart: () => set({ items: [] })
}));