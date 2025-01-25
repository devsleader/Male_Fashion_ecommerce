'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ShopSidebar from '@/components/ShopSidebar';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

const ShopPage: React.FC = () => {
  const filteredProducts = useSelector((state: RootState) => state.products.filteredProducts);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;
  const [selectedFilter, setSelectedFilter] = useState<string>('low-to-high');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const filteredAndSortedProducts = filteredProducts
    .filter(product => {
      if (selectedFilter === '0-55') return product.price >= 0 && product.price <= 55;
      if (selectedFilter === '55-100') return product.price > 55 && product.price <= 100;
      return true; // No filter
    })
    .sort((a, b) => {
      if (selectedFilter === 'low-to-high') return a.price - b.price;
      if (selectedFilter === 'high-to-low') return b.price - a.price;
      return 0; // No sorting
    });

  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto flex">
      <div className="w-1/4">
        <ShopSidebar />
      </div>
      <div className="w-3/4">
      <div className="flex justify-between items-center my-4">
        <div className="text-gray-500">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} results
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <span>Sort by Price:</span>
          <select
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
            <option value="0-55">$0 - $55</option>
            <option value="55-100">$55 - $100</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {currentProducts.map(product => (
          <div
            key={product.id}
            className="border p-4 relative group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <img src={`/api/placeholder/${400}/${320}`} alt={product.name} className="mb-4" />
            {hoveredProduct === product.id && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                  <FaShoppingCart />
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
                  <FaHeart />
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full">
                  <FaEye />
                </button>
              </div>
            )}
            <h2 className="text-lg font-medium mb-2">{product.name}</h2>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-500">({product.rating})</span>
            </div>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-4">
        <div className="space-x-2 text-gray-500">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-2 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShopPage;