'use client'
import BannerSection from "@/components/BannerSection";
import BlogList from "@/components/BlogList";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import Instagram from "@/components/Instagram";
import ProductTabs from '@/components/ProductTabs';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const products = useSelector((state: RootState) => state.products.products);
  // const filteredProducts = useSelector((state: RootState) => state.products.filteredProducts);
  return (
    <>
    <Hero />
    <BannerSection />  
    <Instagram /> 
    <ProductTabs products={products} />  
    <Categories />
    <BlogList count={3} />  
    {/* <ProductGrid products={filteredProducts} limit={50} />  */}
    </>
  );
}
