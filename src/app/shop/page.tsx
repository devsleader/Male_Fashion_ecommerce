'use client'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/cartSlice';
import { addToWishlist } from '@/store/wishlistSlice';
// import ShopSidebar from '@/components/ShopSidebar';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import Link from 'next/link';

import { setFilters, setSearchTerm } from '@/store/productSlice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Product } from '@/types/types';

  

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

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);



  const dispatch = useDispatch();
  const [localFilters, setLocalFilters] = useState({
    category: '',
    brand: '',
    size: '',
    color: '',
    priceRange: { min: 0, max: 250 }
  });
  const [search, setSearch] = useState('');
  const [expandedFilter, setExpandedFilter] = useState<string | null>('Categories');

  const handleSidebarFilterChange = (filterType: string, value: any) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
  };

  const toggleFilterExpansion = (filter: string) => {
    setExpandedFilter(expandedFilter === filter ? null : filter);
  };
  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
  };
   // Add a new function to handle adding to wishlist
   const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="container mx-auto flex">
      <div className="w-1/4">
      <div className="shop__sidebar bg-white p-4">
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* Filters */}
      {['Categories', 'Branding', 'Filter Price', 'Size', 'Colors', 'Tags'].map(filter => (
        <div key={filter} className="mb-6">
          <div
            className="flex justify-between items-center font-bold mb-4 cursor-pointer"
            onClick={() => toggleFilterExpansion(filter)}
          >
            {filter}
            {expandedFilter === filter ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedFilter === filter && (
            <div className={filter === 'Colors' ? 'flex flex-wrap' : ''}>
              {filter === 'Categories' &&
                ['Men', 'Women', 'Bags', 'Clothing', 'Shoes', 'Accessories', 'Kids'].map(category => (
                  <button
                    key={category}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                      localFilters.category === category ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => handleSidebarFilterChange('category', category)}
                  >
                    {category} ({20})
                  </button>
                ))}
              {filter === 'Branding' &&
                ['Louis Vuitton', 'Chanel', 'Hermes', 'Gucci'].map(brand => (
                  <button
                    key={brand}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                      localFilters.brand === brand ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => handleSidebarFilterChange('brand', brand)}
                  >
                    {brand}
                  </button>
                ))}
              {filter === 'Filter Price' &&
                ['$0.00 - $50.00', '$50.00 - $100.00', '$100.00 - $150.00', '$150.00 - $200.00', '$200.00 - $250.00', '250.00+'].map(price => {
                  const [min, max] = price.split(' - ').map(p => parseFloat(p.replace(/[$,]/g, '')));
                  return (
                    <button
                      key={price}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                        localFilters.priceRange.min === min && localFilters.priceRange.max === max ? 'bg-gray-200' : ''
                      }`}
                      onClick={() => handleSidebarFilterChange('priceRange', { min, max })}
                    >
                      {price}
                    </button>
                  );
                })}
              {filter === 'Size' &&
                ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map(size => (
                  <button
                    key={size}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                      localFilters.size === size ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => handleSidebarFilterChange('size', size)}
                  >
                    {size}
                  </button>
                ))}
              {filter === 'Colors' &&
                ['black', 'navy', 'yellow', 'grey', 'olive', 'pink', 'lavender', 'red'].map(color => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`block w-10 h-10 rounded-full mr-2 mb-2 ${
                      localFilters.color === color ? 'ring-2 ring-black' : ''
                    }`}
                    onClick={() => handleSidebarFilterChange('color', color)}
                  />
                ))}
              {filter === 'Tags' &&
                ['Product', 'Bags', 'Shoes', 'Fashio', 'Clothing', 'Hats', 'Accessories'].map(tag => (
                  <button
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                    onClick={() => handleSidebarFilterChange('tags', tag)}
                  >
                    {tag}
                  </button>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
        {/* <ShopSidebar /> */}
      </div>
      <div className="w-3/4">
      <div className="flex justify-between items-center my-4">
        <div className="text-gray-500">
          {filteredAndSortedProducts.length > 0 ? (
            `Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredAndSortedProducts.length)} of ${filteredAndSortedProducts.length} results`
          ) : (
            'No items available'
          )}
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
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product, 1);
                    }}>
                  <FaShoppingCart />
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full" onClick={() => handleAddToWishlist(product)}>
                  <FaHeart />
                </button>
                <Link href={`/shop/${product.id}`}>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full">
                    <FaEye />
                  </button>
                </Link>
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