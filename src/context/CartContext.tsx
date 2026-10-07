import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type { Product } from "../data/products";

type CartItem = Product & {
  quantity: number;
  selectedSize: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (
    product: Product,
    size: string,
    quantity?: number
  ) => void;
  removeFromCart: (
    productId: string,
    size: string
  ) => void;
  updateQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext =
  createContext<CartContextType | null>(null);

const STORAGE_KEY = "tronvox-cart";

export function CartProvider({
  children
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  }, [items]);

  function addToCart(
    product: Product,
    size: string,
    quantity: number = 1
  ) {
    setItems((current) => {
      const existing = current.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id &&
          item.selectedSize === size
            ? {
                ...item,
                quantity: item.quantity + quantity
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          selectedSize: size,
          quantity
        }
      ];
    });
  }

  function removeFromCart(
    productId: string,
    size: string
  ) {
    setItems((current) =>
      current.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === size
          )
      )
    );
  }

  function updateQuantity(
    productId: string,
    size: string,
    quantity: number
  ) {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === productId &&
        item.selectedSize === size
          ? {
              ...item,
              quantity
            }
          : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      ),
    [items]
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}