export default function Newsletter() {
  return (
    <section className="bg-blush py-24">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">
              Stay in the circle
            </p>

            <h2 className="editorial-title mt-5 max-w-xl text-5xl sm:text-6xl">
              JOIN THE
              <br />
              CIRCLE.
            </h2>
          </div>

          <form className="flex border-b border-black">
            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-black/45"
            />

            <button
              type="submit"
              className="bg-black px-7 text-xs font-semibold uppercase tracking-[0.14em] text-white"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}