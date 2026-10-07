import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";

import { products } from "../data/products";
import { collections } from "../data/collections";

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee />

      <section className="py-24 sm:py-32">
        <div className="site-container">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gray">New arrivals</p>
              <h2 className="editorial-title mt-4 text-4xl sm:text-5xl">THE SHOP</h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-semibold uppercase tracking-widest hover:text-gray transition-colors border-b border-black pb-1 w-fit"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32 bg-cream">
        <div className="site-container">
          <div className="mb-12 text-center md:text-left">
            <h2 className="editorial-title text-4xl sm:text-5xl">
              FEATURED<br />COLLECTIONS
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Link to="/collections" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                <img
                  src="/images/collections/collection-bloom.jpg"
                  alt="DROP 04 — CONCRETE BLOOM"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="editorial-title text-white text-3xl mb-3">DROP 04 — CONCRETE BLOOM</h3>
                  <p className="text-white/80 text-sm mb-6 max-w-sm font-medium">Where soft blush meets raw concrete. Our most refined heavyweight range yet.</p>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white border-b border-white pb-1">VIEW PRODUCTS →</span>
                </div>
              </div>
            </Link>

            <Link to="/collections" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                <img
                  src="/images/collections/collection-rose.jpg"
                  alt="THE QUIET ROSE"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="editorial-title text-white text-3xl mb-3">THE QUIET ROSE</h3>
                  <p className="text-white/80 text-sm mb-6 max-w-sm font-medium">A tonal study in pink. Essentials that whisper instead of shout.</p>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white border-b border-white pb-1">VIEW PRODUCTS →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 sm:py-32 text-white">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="aspect-[16/9] lg:aspect-[4/5] overflow-hidden bg-white/5">
              <img 
                src="/images/journal/journal-manifesto.jpg" 
                alt="Brutalist architecture" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <p className="eyebrow text-pink">OUR MANIFESTO</p>
              
              <h2 className="editorial-title mt-6 text-5xl sm:text-6xl leading-[0.9]">
                SOFTNESS IS A<br />FORM OF STRENGTH
              </h2>
              
              <div className="mt-8 space-y-6 text-white/70 text-sm md:text-base leading-relaxed font-medium max-w-lg">
                <p>
                  Tronvox was born from a single idea — that luxury can be quiet.
                  We craft heavyweight essentials between the ateliers of Tokyo
                  and Milan, weaving blush-toned fleece and raw concrete palettes
                  into pieces made to outlast seasons.
                </p>
                <p>
                  No loud logos. No noise. Just considered materials,
                  architectural cuts, and the confidence to be understated.
                  This is silent luxury.
                </p>
              </div>

              <div className="mt-16 pt-12 border-t border-white/20 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-display font-bold">500</div>
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-pink mt-2">GSM FLEECE</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold">2</div>
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-pink mt-2">ATELIERS</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold">100%</div>
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-pink mt-2">CONSIDERED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}