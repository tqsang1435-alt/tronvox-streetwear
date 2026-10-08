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
import Cart from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import OrderDetails from "./pages/OrderDetails";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "TRONVOX | Silent Luxury Streetwear",
      "/shop": "Shop | TRONVOX",
      "/collections": "Collections | TRONVOX",
      "/journal": "Journal | TRONVOX",
      "/cart": "Cart | TRONVOX",
      "/checkout": "Checkout | TRONVOX",
      "/login": "Login | TRONVOX",
      "/register": "Register | TRONVOX",
      "/account": "My Account | TRONVOX"
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders/:id" element={<OrderDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}