import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./../app/context/CartContext"
import { ProductProvider } from "./../app/context/ProductContext"
import { WishlistProvider } from "./../app/context/Wishlist"
import { Toaster } from "react-hot-toast";
import PwaServiceWorkerRegistration from "../components/PwaServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scentora | Luxury Perfume Experience",
  description:
    "Discover timeless fragrances crafted to define your identity and elevate every moment.",
  applicationName: "Scentora",
  appleWebApp: {
    capable: true,
    title: "Scentora",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorantGaramond.variable} h-full antialiased`}

    >

      <body className="relative min-h-screen overflow-x-hidden flex flex-col">
        <PwaServiceWorkerRegistration />
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