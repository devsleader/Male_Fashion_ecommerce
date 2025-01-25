'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, setSearchTerm } from '../store/productSlice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ShopSidebar: React.FC = () => {
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

  const handleFilterChange = (filterType: string, value: any) => {
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

  return (
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
                    onClick={() => handleFilterChange('category', category)}
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
                    onClick={() => handleFilterChange('brand', brand)}
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
                      onClick={() => handleFilterChange('priceRange', { min, max })}
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
                    onClick={() => handleFilterChange('size', size)}
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
                    onClick={() => handleFilterChange('color', color)}
                  />
                ))}
              {filter === 'Tags' &&
                ['Product', 'Bags', 'Shoes', 'Fashio', 'Clothing', 'Hats', 'Accessories'].map(tag => (
                  <button
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                    onClick={() => handleFilterChange('tags', tag)}
                  >
                    {tag}
                  </button>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShopSidebar;