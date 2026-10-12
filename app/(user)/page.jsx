"use client"
import Hero from "../../components/Hero";
import AnouncementBar from "@/components/layout/AnouncementBar";
import FeaturedSections from "../../components/FeaturedSections";
import CategorySection from "../../components/CategorySection";
import About from "../../components/About";
import BestSeller from "../../components/BestSeller";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";

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
      <Testimonials />
      <FAQ />
    </div>
  );
}
