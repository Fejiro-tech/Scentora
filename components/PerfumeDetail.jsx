import React from "react";
import { useCart } from "../app/context/CartContext";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PerfumeDetail = ({ product }) => {

  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <section className="w-full ">
      <div className="max-w-5xl mx-auto py-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-1 text-sm text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Main Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="bg-[#f1ece6] flex items-center justify-center p-10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-xs object-contain drop-shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="p-10 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <p className="text-sm text-gray-500 mt-1 capitalize">
              {product.category}
            </p>

            <p className="text-2xl font-semibold text-black mt-6">
              ₦{product.price}
            </p>

            <p className="text-gray-600 mt-6 leading-relaxed">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="px-6 py-3 bg-black text-white rounded-full hover:scale-105 transition"
              >
                Add to Cart
              </button>

              <button className="px-6 py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfumeDetail;
