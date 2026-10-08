import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../data/products';
import { useAuth } from './AuthContext';

type CartItem = Product & {
  quantity: number;
  selectedSize: string;
  cartItemId?: string;
  variantId?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number, variantId?: string) => Promise<void>;
  removeFromCart: (productId: string, size: string, cartItemId?: string) => Promise<void>;
  updateQuantity: (productId: string, size: string, quantity: number, cartItemId?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isLoading: boolean;
  error: string | null;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = 'tronvox-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const { token, isLoading: isAuthLoading } = useAuth();
  
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from server if authenticated
  useEffect(() => {
    if (isAuthLoading) return;

    if (token) {
      fetchServerCart();
    } else {
      // Load from local storage
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setItems(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, [token, isAuthLoading]);

  // Persist to local storage only if NOT authenticated
  useEffect(() => {
    if (!token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, token]);

  const fetchServerCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success && data.data) {
        const serverItems = data.data.items.map((item: any) => ({
          ...item.product, // maps to product fields
          quantity: item.quantity,
          selectedSize: item.variant.size,
          cartItemId: item.id,
          variantId: item.variant.id,
          price: item.unitPrice,
        }));
        setItems(serverItems);
      }
    } catch (err) {
      console.error('Failed to load cart', err);
      setError('Unable to load your bag');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, size: string, quantity: number = 1, variantId?: string) => {
    if (token && variantId) {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('http://localhost:5000/api/cart/items', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ variantId, quantity })
        });
        
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to add item');
        }
        await fetchServerCart();
        openCart();
      } catch (err: any) {
        setError(err.message);
        console.error(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Guest cart fallback
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return current.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...product, selectedSize: size, quantity, variantId }];
    });
    openCart();
  };

  const removeFromCart = async (productId: string, size: string, cartItemId?: string) => {
    if (token && cartItemId) {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/cart/items/${cartItemId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) await fetchServerCart();
      } catch (err) {
        console.error(err);
        setError('Failed to remove item');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Guest cart fallback
    setItems((current) =>
      current.filter((item) => !(item.id === productId && item.selectedSize === size))
    );
  };

  const updateQuantity = async (productId: string, size: string, quantity: number, cartItemId?: string) => {
    if (quantity <= 0) {
      return removeFromCart(productId, size, cartItemId);
    }

    if (token && cartItemId) {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/cart/items/${cartItemId}`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ quantity })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to update quantity');
        await fetchServerCart();
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Guest cart fallback
    setItems((current) =>
      current.map((item) =>
        item.id === productId && item.selectedSize === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    if (token) {
      try {
        setIsLoading(true);
        await fetch('http://localhost:5000/api/cart', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems([]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
      return;
    }
    setItems([]);
  };

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, subtotal, isCartOpen, openCart, closeCart, isLoading, error
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}