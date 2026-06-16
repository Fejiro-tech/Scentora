import { useCart } from "../app/context/CartContext";

export default function Cart() {

  const { cart, increaseQty, decreaseQty, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className=" text-black  ">
      <div className=" border border-black/10 px-4 py-6 rounded-3xl shadow-2xl">

        {/* Header */}
        <div className="mb-10 ">
          <h1 className="text-lg md:text-xl font-semibold font-['Cormorant_Garamond'] tracking-wide">
            Shopping Cart
          </h1>

          <p className="text-black/90 md:mt-2">
            {cartCount} item(s) in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* CART ITEMS */}
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#140909] border border-white/10 rounded-3xl p-3 md:p-5 flex flex-col md:flex-row gap-3 md:gap-5"
              >
                {/* IMAGE */}
                <div className="w-14 h-14 md:w-24 md:h-24 rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-1 "
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between text-white">
                  <div className="flex items-start justify-between gap-4 text-left">
                    <div>
                      <h2 className="text-base md:text-xl font-['Cormorant_Garamond'] font-medium">{item.name}</h2>

                      <p className="text-white/50 mt-1 text-sm">
                        Scent family: {item.category}
                      </p>
                    </div>

                    <p className="text-base md:text-lg font-medium whitespace-nowrap">
                      ₦{(item.price || 0).toLocaleString()}
                    </p>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                    <div className="flex items-center border border-white/10 rounded-full overflow-hidden text-white">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-4 py-2 hover:bg-white/10 transition"
                      >
                        -
                      </button>

                      <span className="px-5">{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-4 py-2 hover:bg-white/10 transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-400 hover:text-red-300 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="bg-[#140909] border border-white/10 rounded-3xl p-6 h-fit sticky top-24 text-white text-sm md:text-base">
            <h2 className="text-lg md:text-xl font-semibold mb-6 font-['Cormorant_Garamond']">Order Summary</h2>

            <div className="space-y-4 text-white/70">
              <div className="flex items-center justify-between ">
                <p>Subtotal</p>
                <p>₦{(cartTotal || 0).toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between ">
                <p>Delivery</p>
                <p>Free</p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-white text-base md:text-lg font-medium">
                <p>Total</p>
                <p>₦{(cartTotal || 0).toLocaleString()}</p>
              </div>
            </div>

            <button className="w-full bg-[#F7F3EE] text-black rounded-full py-2.5 mt-8 font-medium hover:opacity-90 transition">
              Proceed to Checkout
            </button>

            <button
              onClick={() => router.push("/store")}
              className="w-full border border-white/40 rounded-full py-2.5 mt-4 hover:bg-white/5 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
