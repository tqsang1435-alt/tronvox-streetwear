import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] flex items-center overflow-hidden bg-black">
      {/* Full-bleed Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero-aw26-v2.jpg"
          alt="TRONVOX AW26 Campaign"
          className="w-full h-full object-cover object-[80%_center] md:object-center"
        />
        {/* Subtle dark overlay for text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10 pt-32 pb-24 lg:py-0 lg:-mt-16">
        <div className="max-w-[420px] lg:max-w-[500px]">
          {/* Eyebrow Label */}
          <span className="inline-block bg-pink text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-sm">
            AW26 — SILENT LUXURY
          </span>

          <h1 className="editorial-title mt-6 text-white text-6xl sm:text-7xl lg:text-[76px] xl:text-[86px] tracking-tighter leading-[0.92]">
            FORM<br />
            FOLLOWS<br />
            FEELING
          </h1>

          <p className="mt-8 text-sm sm:text-base leading-[1.8] text-white/90 font-medium">
            A study in restraint. Blush-toned heavyweight essentials,
            engineered for the quiet confident.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="button-primary bg-white text-black hover:bg-cream"
            >
              SHOP NOW →
            </Link>
            <Link
              to="/collections"
              className="button-secondary border-white text-white hover:bg-white hover:text-black"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}