import { Link } from "react-router-dom";

import { brand } from "../data/brand";

export default function Footer() {
  return (
    <footer className="bg-black py-20 text-white">
      <div className="site-container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-[-0.06em]"
            >
              TRONVOX
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              {brand.slogan}.
              <br />
              Tokyo × Milan.
            </p>
          </div>

          <div>
            <p className="eyebrow text-white/50">
              Shop
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <Link to="/shop">New In</Link>
              <Link to="/shop">Shop All</Link>
              <Link to="/collections">
                Collections
              </Link>
            </div>
          </div>

          <div>
            <p className="eyebrow text-white/50">
              Information
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <span>Shipping</span>
              <span>Returns</span>
              <span>Contact</span>
            </div>
          </div>

          <div>
            <p className="eyebrow text-white/50">
              Connect
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <a
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>

              <a
                href={brand.facebook}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>

              <a
                href={`mailto:${brand.email}`}
              >
                {brand.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-6 text-xs text-white/35">
          © {new Date().getFullYear()} TRONVOX.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}