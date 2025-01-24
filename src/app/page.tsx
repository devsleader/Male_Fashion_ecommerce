import BannerSection from "@/components/BannerSection";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import Instagram from "@/components/Instagram";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero />
    <BannerSection />  
    <Instagram /> 
    <Categories />              
    </>
  );
}
