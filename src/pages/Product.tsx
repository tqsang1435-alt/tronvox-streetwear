import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="mt-4 text-sm text-gray leading-6">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Product() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === id
  );

  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] ?? ""
  );
  
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="site-container py-32">
        <h1 className="editorial-title text-6xl">
          Product not found.
        </h1>

        <Link
          to="/shop"
          className="mt-8 inline-block border-b border-black pb-2 text-xs uppercase tracking-[0.14em]"
        >
          Back to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {product.images.map(
              (image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden bg-[#eee8e9]"
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="aspect-[3/4] h-full w-full object-cover"
                  />
                </div>
              )
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-gray">
              {product.category}
            </p>

            <h1 className="editorial-title mt-5 text-5xl sm:text-6xl">
              {product.name}
            </h1>

            <p className="mt-6 text-lg">
              ${product.price}
            </p>

            <p className="mt-8 max-w-md text-sm leading-7 text-gray">
              {product.description}
            </p>

            <div className="mt-10">
              <p className="eyebrow">
                Color
              </p>

              <p className="mt-3 text-sm">
                {product.color}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">
                  Size
                </p>

                <button className="text-xs underline min-h-[44px] min-w-[44px] inline-flex items-center justify-end">
                  Size Guide
                </button>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.sizes.map(
                  (size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={`h-12 border text-sm ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-border hover:border-black transition-colors"
                      }`}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <p className="eyebrow">
                Quantity
              </p>
              
              <div className="mt-4 flex items-center border border-border w-32 h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 flex justify-center items-center h-full hover:bg-gray/5 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 flex justify-center items-center h-full hover:bg-gray/5 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button
              onClick={() =>
                addToCart(
                  product,
                  selectedSize,
                  quantity
                )
              }
              className="mt-8 flex h-14 w-full items-center justify-center bg-black text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-black/90 transition-colors"
            >
              Add to Bag
            </button>

            <div className="mt-10 border-t border-border">
              <Accordion title="Material">
                {product.material}
              </Accordion>

              <Accordion title="Shipping">
                Complimentary worldwide shipping on all orders.
                Standard delivery takes 3-5 business days. Express options available at checkout.
              </Accordion>

              <Accordion title="Returns">
                We accept returns within 14 days of delivery. Items must be unworn, 
                unwashed, and with all original tags attached.
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}