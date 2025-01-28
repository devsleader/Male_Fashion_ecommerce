import React from 'react';
import { Product } from '@/types/types';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import { div } from 'framer-motion/client';

interface ProductGridProps {
  products: Product[];
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, limit }) => {
  const [hoveredProduct, setHoveredProduct] = React.useState<number | null>(null);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
   <div className='container'>
     <div className="grid grid-cols-4 gap-4">
      {displayedProducts.map(product => (
        <div
          key={product.id}
          className="relative group"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <img 
            src={product.images && product.images.length > 0 ? product.images[0] : '/path/to/default/image.jpg'}  
            alt={product.name} 
            className="w-full" 
          />
          {hoveredProduct === product.id && (
            <div className="absolute top-4 right-1 flex flex-col gap-2">
              <button className="bg-white text-black p-2">
                <FaShoppingCart />
              </button>
              <button className="bg-white text-black p-2">
                <FaHeart />
              </button>
              <Link href={`/shop/${product.id}`}>
                <button className="bg-white text-black p-2">
                  <FaEye />
                </button>
              </Link>
            </div>
          )}
          <div className='border p-4'>
            <h2 className="text-lg font-medium mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
   </div>
  );
};

export default ProductGrid;