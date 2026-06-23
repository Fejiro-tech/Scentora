"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="relative w-full max-w-md p-8 rounded-2xl border border-yellow-500/30 bg-zinc-950 shadow-[0_0_40px_rgba(234,179,8,0.15)] font-['Cormorant_Garamond']">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-[0.4em] text-[#c8a064] uppercase">
            SCENTORA
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Luxury store dashboard login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black border border-yellow-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8a064]"
          />

          {/* Password with eye */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-black border border-yellow-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8a064]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c8a064] transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#c8a064] text-black font-semibold hover:bg-[#dbab62] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Enter Dashboard"}
          </button>
        </form>

        {/* glow effect */}
        <div className="absolute inset-0 blur-3xl opacity-10 bg-[rgba(220,185,145,0.95)] -z-10" />
      </div>
    </div>
  );
}