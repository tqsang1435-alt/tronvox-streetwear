import { Link } from "react-router-dom";
import type { Product } from "../data/products";

export default function ProductCard({
  product
}: {
  product: Product;
}) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-white border border-border/50">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {product.badge && (
          <span className="absolute left-4 top-4 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest border border-border/20 text-black">
            {product.badge}
          </span>
        )}
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-black">
              {product.name}
            </h3>

            <p className="mt-1 text-xs text-gray font-medium">
              {product.color}
            </p>
          </div>

          <p className="text-sm font-bold text-black">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}