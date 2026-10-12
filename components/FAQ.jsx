"use client";

import { useState } from "react";

const questions = [
  {
    question: "How can I explore fragrances?",
    answer:
      "Browse the store by fragrance name or explore the scent-family categories to discover options that suit your taste.",
  },
  {
    question: "What details can I find on a fragrance page?",
    answer:
      "Each product page shows the fragrance name, scent category, price, and the available product description.",
  },
  {
    question: "Can I save a fragrance for later?",
    answer:
      "Yes. Use the heart button on a product card to add a fragrance to your wishlist. You can view saved items from the wishlist link in the navigation.",
  },
  {
    question: "How do I add a fragrance to my cart?",
    answer:
      "Choose Add to Cart on a product card or its product page. Products marked out of stock cannot be added from the product listing.",
  },
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-32 bg-[#F7F3EE] px-6 py-20 text-[#1E1E1E] sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[4px] text-[rgba(160,119,66,0.9)] md:text-xs">
            Here to help
          </p>
          <h2
            id="faq-heading"
            className="font-display text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="divide-y divide-[#D8CBBB] border-y border-[#D8CBBB]">
          {questions.map((item, index) => {
            const isOpen = openQuestion === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      setOpenQuestion(isOpen ? null : index)
                    }
                    className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium transition-colors hover:text-[#8b6538] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#9a743c] sm:text-xl"
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-sans text-xl text-[#9a743c]"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  hidden={!isOpen}
                  className="max-w-3xl pb-5 pr-10 text-sm leading-7 text-[#62584e] sm:text-base"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
