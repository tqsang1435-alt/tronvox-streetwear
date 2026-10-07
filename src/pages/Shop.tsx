import {
  useMemo,
  useState
} from "react";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Shop() {
  const [category, setCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const categories = [
    "All",
    ...Array.from(
      new Set(
        products.map(
          (product) => product.category
        )
      )
    )
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [category, search]);

  return (
    <section className="py-20 sm:py-28">
      <div className="site-container">
        <div className="max-w-3xl">
          <p className="eyebrow">
            The store
          </p>

          <h1 className="editorial-title mt-5 text-6xl sm:text-8xl">
            Shop
          </h1>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
                className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  category === item
                    ? "border-black bg-black text-white"
                    : "border-border"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search"
            className="border-b border-black bg-transparent py-2 text-sm outline-none lg:w-56"
          />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center text-sm text-gray">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
}