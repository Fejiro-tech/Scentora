export const metadata = {
  title: "Offline | Scentora",
  description: "Scentora is temporarily unavailable offline.",
};

export default function OfflinePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0f0f] px-6 py-16 text-center text-[#F8F4EF]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-[min(28rem,95vw)] rounded-full border border-[rgba(198,164,106,0.1)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-[min(21rem,72vw)] rounded-full border border-[rgba(198,164,106,0.15)]"
      />

      <section className="relative z-10 flex max-w-lg flex-col items-center">
        <span className="mb-8 flex size-20 items-center justify-center rounded-full border border-[rgba(198,164,106,0.5)] font-display text-5xl text-[#c6a46a]">
          S
        </span>
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c6a46a]">
          Scentora
        </p>
        <h1 className="font-display text-5xl font-light leading-tight sm:text-6xl">
          A moment to
          <br />
          breathe.
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-7 text-[rgba(248,244,239,0.68)] sm:text-base">
          It seems you&apos;re offline. Your next fragrance discovery will be
          here when your connection returns.
        </p>
        <form action="/" method="get" className="mt-9">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center border border-[#c6a46a] px-7 text-xs uppercase tracking-[0.2em] text-[#e3c997] transition-colors hover:bg-[#c6a46a] hover:text-[#0f0f0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6a46a]"
          >
            Try again
          </button>
        </form>
      </section>
    </main>
  );
}
