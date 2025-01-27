'use client'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { FormData } from '@/types/types';
import { clearCart } from '@/store/cartSlice';
import { AppDispatch } from '@/store/store';



const CheckoutPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [showCoupon, setShowCoupon] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    createAccount: false,
    password: '',
    orderNotes: '',
    paymentMethod: null
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add order submission logic here
    console.log('Order submitted:', formData);
    
    // Dispatch action to clear the cart
    dispatch(clearCart());

    // Show order confirmation message
    setOrderConfirmed(true);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {orderConfirmed && (
          <div className="mb-6 text-green-500 font-bold text-center">
            Order confirmed! Thank you for your purchase.
          </div>
        )}
        <div className="checkout__form">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                {/* Coupon Code Section */}
                <div className="coupon__code bg-gray-100 border-t-2 border-green-500 p-6 mb-12">
                  <span className="mr-2">Have a coupon?</span>
                  <button 
                    type="button"
                    onClick={() => setShowCoupon(!showCoupon)}
                    className="text-gray-900 hover:text-gray-700 underline"
                  >
                    Click here to enter your code
                  </button>
                </div>

                {showCoupon && (
                  <div className="mb-8">
                    <input 
                      type="text"
                      placeholder="Coupon code"
                      className="w-full h-12 px-4 border border-gray-300 mb-4"
                    />
                    <button className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider">
                      Apply Coupon
                    </button>
                  </div>
                )}

                <h6 className="checkout__title text-lg font-bold uppercase border-b border-gray-200 pb-6 mb-8">
                  Billing Details
                </h6>

                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="checkout__input">
                    <p className="mb-2">
                      First Name<span className="text-red-600">*</span>
                    </p>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-gray-300"
                      required
                    />
                  </div>

                  <div className="checkout__input">
                    <p className="mb-2">
                      Last Name<span className="text-red-600">*</span>
                    </p>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div className="checkout__input mt-6">
                  <p className="mb-2">
                    Country<span className="text-red-600">*</span>
                  </p>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300"
                    required
                  />
                </div>

                <div className="checkout__input mt-6">
                  <p className="mb-2">
                    Address<span className="text-red-600">*</span>
                  </p>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    placeholder="Street Address"
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 mb-4"
                    required
                  />
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    placeholder="Apartment, suite, unit etc. (optional)"
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300"
                  />
                </div>

                <div className="checkout__input mt-6">
                  <p className="mb-2">
                    Town/City<span className="text-red-600">*</span>
                  </p>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div className="checkout__input">
                    <p className="mb-2">
                      Phone<span className="text-red-600">*</span>
                    </p>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-gray-300"
                      required
                    />
                  </div>

                  <div className="checkout__input">
                    <p className="mb-2">
                      Email<span className="text-red-600">*</span>
                    </p>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div className="checkout__input__checkbox mt-8">
                  <label className="flex items-center mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      name="createAccount"
                      checked={formData.createAccount}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="w-4 h-4 border-2 border-gray-300 mr-2 flex items-center justify-center">
                      {formData.createAccount && (
                        <span className="block w-2 h-2 bg-red-600"></span>
                      )}
                    </span>
                    Create an account?
                  </label>
                  {formData.createAccount && (
                    <div className="checkout__input mt-4">
                      <p className="mb-2">
                        Account Password<span className="text-red-600">*</span>
                      </p>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 border border-gray-300"
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="checkout__input mt-8">
                  <p className="mb-2">Order notes</p>
                  <input
                    type="text"
                    name="orderNotes"
                    value={formData.orderNotes}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="checkout__order bg-gray-100 p-8">
                  <h4 className="order__title text-lg font-bold uppercase border-b border-gray-300 pb-6 mb-8">
                    Your order
                  </h4>
                  
                  <div className="checkout__order__products flex justify-between mb-6 font-bold">
                    Product <span>Total</span>
                  </div>

                  <ul className="checkout__total__products mb-6">
                    {cart.items.map((item, index) => (
                      <li key={item.id} className="flex justify-between mb-4 text-gray-600">
                        {`${String(index + 1).padStart(2, '0')}. ${item.name}`}
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="checkout__total__all border-y border-gray-300 py-4 mb-6">
                    <li className="flex justify-between mb-2">
                      Subtotal <span className="text-red-600 font-bold">${cart.total.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                      Total <span className="text-red-600 font-bold">${cart.total.toFixed(2)}</span>
                    </li>
                  </ul>

                  <div className="space-y-4 mb-8">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="check"
                        checked={formData.paymentMethod === 'check'}
                        onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'check' }))}
                        className="hidden"
                      />
                      <span className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2 flex items-center justify-center">
                        {formData.paymentMethod === 'check' && (
                          <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                        )}
                      </span>
                      Check Payment
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                        className="hidden"
                      />
                      <span className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2 flex items-center justify-center">
                        {formData.paymentMethod === 'paypal' && (
                          <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                        )}
                      </span>
                      PayPal
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-3 px-4 font-bold uppercase tracking-wider hover:bg-gray-800"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;