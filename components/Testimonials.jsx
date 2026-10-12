export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-32 bg-[#0f0a0a] px-6 py-20 text-[#F7F3EE] sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[4px] text-[rgba(200,160,100,0.85)] md:text-xs">
          Your experience
        </p>
        <h2
          id="testimonials-heading"
          className="font-display text-3xl font-medium sm:text-4xl md:text-5xl"
        >
          Testimonials
        </h2>
        <div className="mx-auto mt-8 max-w-2xl border-y border-[rgba(200,160,100,0.24)] px-6 py-8 sm:px-10">
          <p className="text-sm leading-7 text-[#C7BDB2] sm:text-base">
            We don&apos;t have verified customer reviews to share just yet.
            This space is reserved for genuine Scentora customer experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
