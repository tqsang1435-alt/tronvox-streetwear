import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import Journal from "./pages/Journal";
import Product from "./pages/Product";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "TRONVOX | Silent Luxury Streetwear",
      "/shop": "Shop | TRONVOX",
      "/collections": "Collections | TRONVOX",
      "/journal": "Journal | TRONVOX",
    };
    
    if (location.pathname.startsWith("/product/")) {
      document.title = "Product | TRONVOX";
    } else {
      document.title = titles[location.pathname] || "TRONVOX";
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-cream text-black">
      <Header />
      <CartDrawer />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}