'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    // Add discount logic here
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/shop" className="inline-block bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="section-title mb-12 text-center">
          <span className="text-red-600 text-sm font-bold uppercase tracking-wider">Shopping Cart</span>
          <h2 className="text-3xl font-bold mt-4">Your Cart Items</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="shopping__cart__table">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-6 text-sm font-bold uppercase">Product</th>
                    <th className="text-center pb-6 text-sm font-bold uppercase">Quantity</th>
                    <th className="text-right pb-6 text-sm font-bold uppercase">Total</th>
                    <th className="pb-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-8">
                        <div className="flex items-center">
                          <div className="w-24 h-24 flex-shrink-0">
                            <img 
                              src={item.img || '/images/product/product-1.jpg'}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-6">
                            <h6 className="text-gray-900 font-semibold mb-2">{item.name}</h6>
                            <h5 className="text-gray-900 font-bold">${item.price.toFixed(2)}</h5>
                          </div>
                        </div>
                      </td>
                      <td className="py-8">
                        <div className="flex justify-center">
                          <div className="quantity">
                            <div className="pro-qty-2 flex items-center">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-2 text-gray-500 hover:text-gray-700"
                              >
                                -
                              </button>
                              <input 
                                type="text" 
                                value={item.quantity}
                                readOnly
                                className="w-12 text-center"
                              />
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 text-gray-500 hover:text-gray-700"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 text-right font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-8 text-right">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                        >
                          <FaTimes className="text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-8">
              <Link href="/shop" className="px-8 py-3 border border-gray-300 font-bold uppercase tracking-wider hover:bg-gray-100">
                Continue Shopping
              </Link>
              <button className="px-8 py-3 border border-gray-300 font-bold uppercase tracking-wider hover:bg-gray-100">
                Update cart
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="mb-8">
              <h6 className="font-bold uppercase mb-6 text-gray-900">Discount codes</h6>
              <form onSubmit={handleApplyDiscount} className="relative">
                <input 
                  type="text" 
                  placeholder="Coupon code"
                  className="w-full h-12 px-4 border border-gray-300 focus:outline-none focus:border-gray-400"
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-12 px-6 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800"
                >
                  Apply
                </button>
              </form>
            </div>
            
            <div className="bg-gray-100 p-8">
              <h6 className="font-bold uppercase mb-6 text-gray-900">Cart total</h6>
              <ul className="mb-6 space-y-4">
                <li className="flex justify-between text-gray-700">
                  Subtotal <span className="font-bold text-red-600">${cart.total.toFixed(2)}</span>
                </li>
                <li className="flex justify-between text-gray-700 font-bold">
                  Total <span className="text-red-600">${cart.total.toFixed(2)}</span>
                </li>
              </ul>
              <Link href="/checkout">
                <button className="w-full bg-black text-white py-3 px-4 font-bold uppercase tracking-wider hover:bg-gray-800">
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;