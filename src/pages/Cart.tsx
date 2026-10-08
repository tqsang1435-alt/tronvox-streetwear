import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Minus, Plus, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, isLoading, error } = useCart();
  const navigate = useNavigate();

  const shippingGoal = 200;
  const shippingRemaining = Math.max(0, shippingGoal - subtotal);
  const progressPercent = Math.min(100, (subtotal / shippingGoal) * 100);

  return (
    <section className="py-12 sm:py-24">
      <div className="site-container max-w-5xl">
        <h1 className="editorial-title text-4xl mb-12">Shopping Bag</h1>

        {error && (
          <div className="mb-8 px-6 py-4 border border-border bg-[#F5F2F3]">
            <p className="text-xs tracking-widest text-[#E9A5B7] uppercase text-center font-semibold">{error}</p>
          </div>
        )}

        {items.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray border-t border-border">
            <ShoppingBag size={48} strokeWidth={1} className="mb-6" />
            <p className="mb-8 text-center text-sm">Your bag is empty.</p>
            <Link to="/shop" className="button-primary px-8">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left: Cart Items */}
            <div className={`flex-1 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-border text-xs uppercase tracking-widest text-gray font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <div className="space-y-8 py-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex sm:grid sm:grid-cols-12 gap-6 sm:gap-4 items-start sm:items-center">
                    <div className="col-span-6 flex gap-6 w-full sm:w-auto">
                      <Link to={`/product/${item.id}`} className="w-24 shrink-0 bg-[#F5F2F3] aspect-[3/4]">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                      </Link>
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} className="font-medium text-sm hover:text-gray transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray mt-1 mb-3">{item.color} / {item.selectedSize}</p>
                        
                        {/* Mobile controls */}
                        <div className="sm:hidden flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border w-28 h-10">
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1, item.cartItemId)}
                              className="flex-1 flex justify-center items-center h-full hover:bg-black/5"
                            ><Minus size={14} /></button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1, item.cartItemId)}
                              className="flex-1 flex justify-center items-center h-full hover:bg-black/5"
                            ><Plus size={14} /></button>
                          </div>
                          <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.cartItemId)}
                          className="text-xs text-gray uppercase tracking-widest mt-4 underline underline-offset-4 decoration-border hover:decoration-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Desktop controls */}
                    <div className="hidden sm:flex col-span-3 justify-center">
                      <div className="flex items-center border border-border w-28 h-11">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1, item.cartItemId)}
                          className="flex-1 flex justify-center items-center h-full hover:bg-black/5"
                        ><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1, item.cartItemId)}
                          className="flex-1 flex justify-center items-center h-full hover:bg-black/5"
                        ><Plus size={14} /></button>
                      </div>
                    </div>

                    <div className="hidden sm:block col-span-3 text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-[#FCFAFA] border border-border p-6 md:p-8">
                <h2 className="text-sm uppercase tracking-widest font-semibold mb-6">Order Summary</h2>
                
                <div className="mb-6">
                  <p className="text-xs text-center text-gray mb-3">
                    {shippingRemaining > 0
                      ? `You're $${shippingRemaining.toFixed(2)} away from complimentary shipping.`
                      : "You have unlocked complimentary shipping."}
                  </p>
                  <div className="h-0.5 w-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-black transition-all duration-700 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-gray">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray">
                    <span>Estimated Shipping</span>
                    <span>{shippingRemaining > 0 ? "Calculated at checkout" : "Free"}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium mb-8">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => navigate("/checkout")}
                  className="flex h-14 w-full items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black/90"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

