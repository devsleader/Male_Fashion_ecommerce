'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import wishlistSlice, { removeFromWishlist }  from '@/store/wishlistSlice';
import { addToCart } from '@/store/cartSlice';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';


const WishlistPage = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link href="/shop">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">PRODUCT</th>
                <th className="px-6 py-4 text-left">PRICE</th>
                <th className="px-6 py-4 text-left">STOCK STATUS</th>
                <th className="px-6 py-4 text-left">ACTIONS</th>
                <th className="px-6 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={`/api/placeholder/100/100`}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${item.stock && item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.stock && item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === undefined || item.stock === 0}
                      className={`flex items-center px-4 py-2 rounded ${
                        item.stock && item.stock > 0 
                          ? 'bg-black text-white hover:bg-gray-800' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <FaShoppingCart className="mr-2" />
                      ADD TO CART
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;