import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./../app/context/CartContext"
import { ProductProvider } from "./../app/context/ProductContext"
import { WishlistProvider } from "./../app/context/Wishlist"
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scentora | Luxury Perfume Experience",
  description:
    "Discover timeless fragrances crafted to define your identity and elevate every moment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}

    >

      <body className="relative min-h-screen overflow-x-hidden flex flex-col">
        <WishlistProvider>

          <ProductProvider>
            <CartProvider>
              <main className=" flex-1">
                {children}
                <Toaster position="top-center" />
              </main>
            </CartProvider>
          </ProductProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}