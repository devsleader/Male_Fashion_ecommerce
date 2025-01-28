import React, { useState } from 'react';
import ProductSection from './ProductSection';
import { Product } from '@/types/types';

interface ProductTabsProps {
  products: Product[];
}

const ProductTabs = ({ products }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState('best-sellers');
  
  // Filter products based on your criteria
  // comment when real data comes
//   const bestSellers = products.filter(product => product.rating >= 4.5); 
  const  bestSellers = products.slice(4, 12);
  const newArrivals = products.slice(0, 4); // Newest products
  const hotSales = products.slice(12, 16); 
  // comment when real data comes
//   const hotSales = products.filter(product => product.stock !== undefined && product.stock <= 5);


  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-center space-x-8 mb-12">
        <button
          className={`text-2xl font-semibold ${
            activeTab === 'best-sellers' ? 'text-black' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('best-sellers')}
        >
          Best Sellers
        </button>
        <button
          className={`text-2xl font-semibold ${
            activeTab === 'new-arrivals' ? 'text-black' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('new-arrivals')}
        >
          New Arrivals
        </button>
        <button
          className={`text-2xl font-semibold ${
            activeTab === 'hot-sales' ? 'text-black' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('hot-sales')}
        >
          Hot Sales
        </button>
      </div>

      <div className="transition-all duration-300">
        {activeTab === 'best-sellers' && (
          <ProductSection
            title="Best Sellers"
            products={bestSellers}
            isActive={true}
          />
        )}
        {activeTab === 'new-arrivals' && (
          <ProductSection
            title="New Arrivals"
            products={newArrivals}
            isActive={true}
          />
        )}
        {activeTab === 'hot-sales' && (
          <ProductSection
            title="Hot Sales"
            products={hotSales}
            isActive={true}
          />
        )}
      </div>
    </div>
  );
};

export default ProductTabs;