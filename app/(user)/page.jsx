"use client"
import Hero from "../../components/Hero";
import AnouncementBar from "@/components/layout/AnouncementBar";
import FeaturedSections from "../../components/FeaturedSections";
import CategorySection from "../../components/CategorySection";
import About from "../../components/About";
import BestSeller from "../../components/BestSeller";
import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";

export default function Home() {
  console.log("HOME RENDER");

  return (
    <div className=" min-h-screen w-full bg-[#0f0a0a]">
      <Hero />
      <AnouncementBar
        items={[
          "Scent. Presence. Memory.",
          "Where scent becomes identity",
          "Crafted for timeless elegance",
        ]}
      />
      <BestSeller />
      <FeaturedSections />
      <CategorySection />
      <About />
    </div>
  );
}
