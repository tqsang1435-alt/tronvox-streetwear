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
    <section className="py-6 sm:py-12 lg:py-16">
      <div className="site-container">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* Left: Image Gallery (56%) */}
          <div className="w-full lg:w-[56%] flex flex-col gap-4">
            <div className="w-full relative bg-[#F5F2F3] overflow-hidden aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center">
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  objectFit: product.imageFit || "contain",
                  objectPosition: product.imagePosition || "center",
                  transform: `scale(${product.imageScale || 1})`
                }}
                className="w-full h-full transform-gpu transition-transform"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    className="aspect-[3/4] sm:aspect-square bg-[#F5F2F3] overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center"
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      style={{
                        objectFit: product.imageFit || "contain",
                        objectPosition: product.imagePosition || "center",
                        transform: `scale(${product.imageScale || 1})`
                      }}
                      className="w-full h-full transform-gpu"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info (44%) */}
          <div className="w-full lg:w-[44%] lg:sticky lg:top-28">
            <div className="max-w-md xl:max-w-lg lg:pl-4 xl:pl-8">
              <p className="eyebrow text-gray">
                {product.category}
              </p>

              <h1 className="editorial-title mt-2 text-4xl sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 text-lg font-medium">
                ${product.price}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-gray">
                {product.description}
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <p className="eyebrow mb-2">Color</p>
                <p className="text-sm font-medium">{product.color}</p>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="eyebrow">Size</p>
                  <button className="text-xs underline hover:text-gray transition-colors">
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-border hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-5">
                <p className="eyebrow mb-2">Quantity</p>
                <div className="flex items-center border border-border w-32 h-11">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 flex justify-center items-center h-full hover:bg-black/5 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 flex justify-center items-center h-full hover:bg-black/5 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="mt-8 flex h-14 w-full items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white hover:bg-black/90 transition-colors"
              >
                Add to Bag
              </button>

              <div className="mt-8 border-t border-border">
                <Accordion title="Material" defaultOpen>
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
      </div>
    </section>
  );
}