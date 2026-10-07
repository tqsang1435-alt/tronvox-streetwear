export type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
  category: string;
  sizes: string[];
  images: string[];
  description: string;
  material?: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "heavyweight-blush-hoodie",
    name: "Heavyweight Blush Oversized Hoodie",
    price: 185,
    color: "Blush Pink",
    category: "Hoodies & Sweats",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/product-hoodie-pink.jpg"],
    description: "A heavyweight everyday hoodie designed with a relaxed architectural silhouette.",
    material: "500 GSM organic heavyweight fleece",
    badge: "NEW DROP"
  },
  {
    id: "heavyweight-black-hoodie",
    name: "Studio Black Oversized Hoodie",
    price: 185,
    color: "Studio Black",
    category: "Hoodies & Sweats",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/product-hoodie-black.jpg"],
    description: "A heavyweight everyday hoodie designed with a relaxed architectural silhouette.",
    material: "500 GSM organic heavyweight fleece",
    badge: "ESSENTIAL"
  },
  {
    id: "heavyweight-blush-sweatpants",
    name: "Heavyweight Blush Sweatpants",
    price: 145,
    color: "Blush Pink",
    category: "Pants",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/product-sweatpants-pink.jpg"],
    description: "Structured sweatpants balancing understated luxury with everyday utility.",
    material: "500 GSM organic heavyweight fleece",
    badge: "LIMITED"
  },
  {
    id: "heavyweight-black-sweatpants",
    name: "Studio Black Sweatpants",
    price: 145,
    color: "Studio Black",
    category: "Pants",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/product-sweatpants-black.jpg"],
    description: "Structured sweatpants balancing understated luxury with everyday utility.",
    material: "500 GSM organic heavyweight fleece",
    badge: "ESSENTIAL"
  }
];