"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, Heart, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useWishlist } from "../../app/context/Wishlist";
import { useCart } from "../../app/context/CartContext";
import { useProduct } from "../../app/context/ProductContext";

const navlinks = [
  { name: "About Us", href: "/#about" },
  { name: "Best Sellers", href: "/#best-sellers" },
  { name: "FAQ", href: "/#faq" },
  { name: "Testimonials", href: "/#testimonials" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeResult, setActiveResult] = useState(0);

  const { products, isLoadingProducts, productsError, fetchProducts } = useProduct();

  const { wishlist } = useWishlist();
  const { cart, cartCount } = useCart();
  const router = useRouter();
  const searchInputRef = useRef(null);
  const searchButtonRef = useRef(null);

  const matchingProducts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    if (!query) return [];

    return products
      .filter(
        (product) =>
          product.slug &&
          [product.name, product.category]
            .filter(Boolean)
            .some((value) => value.toLocaleLowerCase().includes(query)),
      )
      .slice(0, 8);
  }, [products, searchTerm]);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      setIsSearchOpen(false);
      setSearchTerm("");
      setActiveResult(0);
      searchButtonRef.current?.focus();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  const closeSearch = (restoreFocus = false) => {
    setIsSearchOpen(false);
    setSearchTerm("");
    setActiveResult(0);
    if (restoreFocus) searchButtonRef.current?.focus();
  };

  const goToProduct = (product) => {
    if (!product?.slug) return;
    router.push(`/store/perfume/${product.slug}`);
    closeSearch();
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "ArrowDown" && matchingProducts.length > 0) {
      event.preventDefault();
      setActiveResult((current) =>
        Math.min(current + 1, matchingProducts.length - 1),
      );
    } else if (event.key === "ArrowUp" && matchingProducts.length > 0) {
      event.preventDefault();
      setActiveResult((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && matchingProducts.length > 0) {
      event.preventDefault();
      goToProduct(matchingProducts[activeResult] ?? matchingProducts[0]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.button
            type="button"
            aria-label="Close product search"
            onClick={() => closeSearch(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 cursor-default bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-10 left-0 w-full z-50 transition-all duration-500 text-[#F8F4EF] bg-black/80 backdrop-blur-xl border-b border-[rgba(200,160,100,0.35)]
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-8 lg:px-10 py-5 max-w-360 mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] uppercase tracking-[4px] font-semibold"
          >
            Scentora
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-14">
            {navlinks.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="relative group cursor-pointer text-[11px] uppercase tracking-[3px] text-[rgba(245,239,230,0.78)] hover:text-white transition"
                >
                  {item.name}

                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-[rgba(220,185,145,0.95)] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-white">
            <button
              ref={searchButtonRef}
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsSearchOpen((open) => !open);
              }}
              aria-label={isSearchOpen ? "Close product search" : "Search products"}
              aria-expanded={isSearchOpen}
              aria-controls="navbar-product-search"
              className="inline-flex size-8 items-center justify-center text-white transition hover:text-[rgba(200,160,100,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a064]"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            <Link href="/store/wishlist" className="relative cursor-pointer">
              <Heart
                size={18}
                className="hover:text-[rgba(200,160,100,0.8)] transition"
              />

              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link href="/store/cart" className="relative cursor-pointer">
              <ShoppingCart
                size={18}
                className="hover:text-[rgba(200,160,100,0.8)] transition"
              />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse">{cartCount}</span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden hover:text-[rgba(200,160,100,0.9)] cursor-pointer"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.section
              id="navbar-product-search"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-60 overflow-hidden border-b border-[rgba(200,160,100,0.35)] bg-[#100d0c]/98 shadow-2xl backdrop-blur-xl"
            >
              <div className="mx-auto max-h-[min(70vh,36rem)] max-w-3xl overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <label
                    htmlFor="navbar-search-input"
                    className="text-[10px] uppercase tracking-[0.28em] text-[#c8a064]"
                  >
                    Discover a fragrance
                  </label>
                  <button
                    type="button"
                    onClick={() => closeSearch(true)}
                    className="inline-flex min-h-9 items-center gap-2 text-xs text-[#d8cec2] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a064]"
                  >
                    <X size={15} aria-hidden="true" />
                    Close
                  </button>
                </div>

                <div className="flex items-center gap-3 border-b border-[rgba(200,160,100,0.5)] pb-3">
                  <Search
                    size={19}
                    aria-hidden="true"
                    className="shrink-0 text-[#c8a064]"
                  />
                  <input
                    ref={searchInputRef}
                    id="navbar-search-input"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      setActiveResult(0);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search by name or scent family"
                    autoComplete="off"
                    role="combobox"
                    aria-label="Search perfumes by name or scent family"
                    aria-autocomplete="list"
                    aria-expanded={searchTerm.trim().length > 0}
                    aria-controls="navbar-search-results"
                    aria-activedescendant={
                      !isLoadingProducts &&
                      !productsError &&
                      matchingProducts[activeResult]
                        ? `navbar-search-result-${matchingProducts[activeResult].id}`
                        : undefined
                    }
                    className="min-w-0 flex-1 bg-transparent py-1 text-base text-[#F8F4EF] placeholder:text-[#8f8377] focus:outline-none sm:text-lg [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-ms-clear]:hidden"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm("");
                        setActiveResult(0);
                        searchInputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                      className="inline-flex size-8 items-center justify-center text-[#b8aa9d] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8a064]"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>

                <div
                  id="navbar-search-results"
                  className="mt-3"
                >
                  {!searchTerm.trim() && (
                    <p className="py-4 text-sm text-[#b8aa9d]">
                      Search by fragrance name or scent family.
                    </p>
                  )}
                  {searchTerm.trim() && isLoadingProducts && (
                    <p role="status" className="py-4 text-sm text-[#d8cec2]">
                      Finding fragrances...
                    </p>
                  )}
                  {searchTerm.trim() && productsError && (
                    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                      <p role="alert" className="text-sm text-[#e4c4ae]">
                        Products could not be loaded. Please try again.
                      </p>
                      <button
                        type="button"
                        onClick={fetchProducts}
                        className="text-xs uppercase tracking-[0.15em] text-[#d4a76a] underline underline-offset-4 hover:text-[#f5e6d3]"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  {searchTerm.trim() &&
                    !isLoadingProducts &&
                    !productsError &&
                    matchingProducts.length === 0 && (
                      <p role="status" className="py-4 text-sm text-[#b8aa9d]">
                        No fragrances found. Try another name or scent family.
                      </p>
                    )}
                  <ul
                    role="listbox"
                    aria-label="Product search results"
                    className="divide-y divide-[rgba(200,160,100,0.18)]"
                  >
                    {matchingProducts.length > 0 &&
                      !isLoadingProducts &&
                      !productsError &&
                      matchingProducts.map((product, index) => (
                        <li key={product.id} role="presentation">
                          <Link
                            id={`navbar-search-result-${product.id}`}
                            href={`/store/perfume/${product.slug}`}
                            prefetch={false}
                            role="option"
                            aria-selected={index === activeResult}
                            onMouseEnter={() => setActiveResult(index)}
                            onClick={() => closeSearch()}
                            className={`flex items-center gap-4 px-2 py-3 transition-colors ${
                              index === activeResult
                                ? "bg-white/[0.07]"
                                : "hover:bg-white/4"
                            }`}
                          >
                            <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden bg-[#1b1613] sm:size-16">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt=""
                                  fill
                                  sizes="64px"
                                  className="object-contain p-1"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="font-display text-xl text-[#c8a064]"
                                >
                                  S
                                </span>
                              )}
                            </span>
                            <span className="min-w-0 flex-1 text-left">
                              <span className="block truncate font-display text-base text-[#F8F4EF] sm:text-lg">
                                {product.name}
                              </span>
                              <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-[#b8aa9d]">
                                {product.category || "Fragrance"}
                              </span>
                            </span>
                            <ArrowUpRight
                              size={17}
                              aria-hidden="true"
                              className="shrink-0 text-[#c8a064]"
                            />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-24 left-0 w-full bg-black/95 backdrop-blur-xl z-50 px-8 py-10 space-y-10 transform transition-all duration-500 lg:hidden flex flex-col border-y border-[rgba(200,160,100,0.35)] ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {navlinks.map((item, idx) => (
          <Link
            href={item.href}
            onClick={() => setIsOpen(false)}
            key={idx}
            className="uppercase tracking-[3px] text-sm md:text-base font-bold text-[rgba(245,239,230,0.85)] hover:text-[rgba(200,160,100,0.8)] transition cursor-pointer"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
