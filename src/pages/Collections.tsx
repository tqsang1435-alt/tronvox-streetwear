import { collections } from "../data/collections";

export default function Collections() {
  return (
    <section className="py-20 sm:py-28">
      <div className="site-container">
        <div className="max-w-3xl">
          <p className="eyebrow">
            Editorial collections
          </p>

          <h1 className="editorial-title mt-5 text-6xl sm:text-8xl">
            Collections
          </h1>
        </div>

        <div className="mt-20 space-y-24">
          {collections.map(
            (collection, index) => (
              <article
                key={collection.id}
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1
                    ? "lg:[&>*:first-child]:order-2"
                    : ""
                }`}
              >
                <div className="overflow-hidden bg-[#eee8e9]">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="lg:px-12">
                  <p className="eyebrow">
                    0{index + 1}
                  </p>

                  <h2 className="editorial-title mt-5 text-5xl sm:text-6xl">
                    {collection.title}
                  </h2>

                  <p className="mt-6 max-w-md text-sm leading-7 text-gray">
                    {collection.description}
                  </p>

                  <button className="mt-8 border-b border-black pb-2 text-xs font-semibold uppercase tracking-[0.14em]">
                    Explore Collection
                  </button>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}