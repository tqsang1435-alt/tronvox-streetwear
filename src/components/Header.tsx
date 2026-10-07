import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingBag,
  X
} from "lucide-react";

import {
  Link,
  NavLink
} from "react-router-dom";

import { useCart } from "../context/CartContext";

const navigation = [
  {
    label: "New In",
    href: "/shop"
  },
  {
    label: "Shop",
    href: "/shop"
  },
  {
    label: "Collections",
    href: "/collections"
  },
  {
    label: "Journal",
    href: "/journal"
  }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/90 backdrop-blur-md">
      <div className="site-container">
        <div className="flex h-[76px] items-center justify-between gap-8">
          <button
            className="lg:hidden h-11 w-11 flex items-center justify-center -ml-3"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          <Link
            to="/"
            className="text-xl lg:text-2xl font-bold tracking-[0.2em] uppercase font-display"
          >
            TRONVOX
          </Link>

          <nav className="hidden items-center gap-8 lg:flex absolute left-1/2 -translate-x-1/2">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-widest transition-opacity duration-300 hover:opacity-100 ${
                    isActive ? "opacity-100" : "opacity-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="hidden lg:flex h-11 w-11 items-center justify-center hover:opacity-70 transition-opacity"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Shopping bag"
              className="relative h-11 w-11 flex items-center justify-center hover:opacity-70 transition-opacity"
              onClick={openCart}
            >
              <ShoppingBag
                size={18}
                strokeWidth={1.5}
              />
              {totalItems > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="fixed inset-0 bg-black/40 transition-opacity backdrop-blur-[2px]" 
            aria-hidden="true" 
            onClick={() => setMobileOpen(false)} 
          />
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-cream border-r border-border flex flex-col transition-transform duration-500 ease-out">
            <div className="flex h-[76px] items-center justify-between px-6 border-b border-border">
              <Link
                to="/"
                className="text-[20px] font-bold tracking-widest uppercase font-display"
                onClick={() => setMobileOpen(false)}
              >
                TRONVOX
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="h-11 w-11 flex items-center justify-center -mr-3 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-6 py-12 flex flex-col gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="editorial-title text-3xl tracking-wide uppercase hover:text-gray transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="p-6 border-t border-border">
              <button className="flex items-center gap-3 w-full p-4 bg-white border border-border text-sm font-semibold tracking-widest uppercase">
                <Search size={16} /> Search
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}