'use client'
import React, { useState } from 'react';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import { Product } from '@/types/types';
import { addToCart } from '@/store/cartSlice';
import { addToWishlist } from '@/store/wishlistSlice';
import { useDispatch } from 'react-redux';

interface ProductSectionProps {
  title: string;
  products: Product[];
  isActive?: boolean;
}

const ProductSection = ({ title, products, isActive = false }: ProductSectionProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                Only {product.stock} left
              </span>
            )}
            {product.stock !== undefined && product.stock === 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                Out of Stock
              </span>
            )}
            <div className="relative overflow-hidden">
              <img
                src={product.images?.[0] || '/path/to/default/image.jpg'}
                alt={product.name}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {hoveredProduct === product.id && (
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    className="bg-white hover:bg-black hover:text-white transition-colors p-2 shadow-md"
                    onClick={() => handleAddToCart(product, 1)}
                    disabled={product.stock === 0}
                  >
                    <FaShoppingCart className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-white hover:bg-black hover:text-white transition-colors p-2 shadow-md"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <FaHeart className="w-4 h-4" />
                  </button>
                  <Link href={`/shop/${product.id}`}>
                    <button className="bg-white hover:bg-black hover:text-white transition-colors p-2 shadow-md">
                      <FaEye className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="p-4 border border-t-0">
              <Link href={`/shop/${product.id}`}>
                <h3 className="text-lg font-medium mb-2 hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-500">({product.rating})</span>
              </div>
              <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;