import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, subtotal } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const shippingGoal = 200;
  const shippingRemaining = Math.max(0, shippingGoal - subtotal);
  const progressPercent = Math.min(100, (subtotal / shippingGoal) * 100);

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 backdrop-blur-[2px]"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div
        className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-cream z-[101] flex flex-col border-l border-border transition-transform duration-500 ease-out transform translate-x-0"
        role="dialog"
        aria-label="Shopping Cart"
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-border">
          <h2 className="editorial-title text-2xl">Bag ({items.length})</h2>
          <button
            onClick={closeCart}
            className="h-11 w-11 flex items-center justify-center -mr-3 hover:bg-black/5 transition-colors rounded-full"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {items.length > 0 && (
          <div className="px-6 md:px-8 py-4 border-b border-border bg-white">
            <p className="eyebrow mb-3 text-center">
              {shippingRemaining > 0
                ? `You're $${shippingRemaining} away from complimentary shipping.`
                : "You have unlocked complimentary shipping."}
            </p>
            <div className="h-0.5 w-full bg-border overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray space-y-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your bag is empty.</p>
              <button
                onClick={closeCart}
                className="button-primary mt-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6">
                <Link to={`/product/${item.id}`} onClick={closeCart} className="w-24 shrink-0 bg-white">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-auto object-contain aspect-[3/4]"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        onClick={closeCart}
                        className="font-medium hover:text-gray transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray text-sm mt-1">
                        {item.color} | Size {item.selectedSize}
                      </p>
                    </div>
                    <p className="font-semibold">${item.price}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border mt-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="w-11 h-11 flex items-center justify-center hover:bg-black/5"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="w-11 h-11 flex items-center justify-center hover:bg-black/5"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-xs text-gray uppercase tracking-widest hover:text-black underline underline-offset-4 decoration-border hover:decoration-black transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 md:p-8 bg-white">
            <div className="flex justify-between items-center mb-6">
              <span className="eyebrow">Subtotal</span>
              <span className="font-semibold text-lg">${subtotal}</span>
            </div>
            <button className="button-primary w-full">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
