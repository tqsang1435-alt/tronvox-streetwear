const articles = [
  {
    title: "The Architecture of Silence",
    category: "Culture",
    image: "/images/journal/journal-manifesto.jpg"
  },
  {
    title: "Between Tokyo & Milan",
    category: "Journal",
    image: "/images/journal/journal-manifesto.jpg"
  },
  {
    title: "Why Weight Matters",
    category: "Materials",
    image: "/images/journal/journal-manifesto.jpg"
  }
];

export default function Journal() {
  return (
    <section className="py-20 sm:py-28">
      <div className="site-container">
        <div className="max-w-3xl">
          <p className="eyebrow">
            Stories & ideas
          </p>

          <h1 className="editorial-title mt-5 text-6xl sm:text-8xl">
            Journal
          </h1>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#eee8e9]">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <p className="eyebrow mt-5 text-gray">
                {article.category}
              </p>

              <h2 className="mt-3 text-xl font-medium tracking-[-0.02em]">
                {article.title}
              </h2>

              <button className="mt-5 border-b border-black pb-1 text-[10px] font-semibold uppercase tracking-[0.14em]">
                Read Story
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}