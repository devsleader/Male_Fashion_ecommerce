'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Product, ColorOption } from '@/types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { addToWishlist } from '@/store/wishlistSlice';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = Number(params.id);
  
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState(product?.size || 'xl');
  const [selectedColor, setSelectedColor] = useState(product?.color || 'black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');

  // Ensure the addToCart action in your Redux slice handles the quantity correctly
  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  // Add a new function to handle adding to wishlist
  const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist(product));
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  // Define available sizes based on the category
  const sizes = product.category === 'Accessories' ? ['one-size'] : ['xxl', 'xl', 'l', 'm', 's'];
  
  const colors: ColorOption[] = [
    { name: 'black', class: 'bg-black' },
    { name: 'grey', class: 'bg-gray-500' },
    { name: 'white', class: 'bg-white border border-gray-300' },
    { name: 'brown', class: 'bg-yellow-900' },
    { name: 'blue', class: 'bg-blue-600' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'tan', class: 'bg-yellow-700' },
    { name: 'red', class: 'bg-red-600' }
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Use a consistent SKU based on product ID
  const sku = `${product.category.substring(0, 3).toUpperCase()}${product.id}`;

  return (
    <section className="shop-details">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="py-4 mb-8">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="text-gray-600 hover:text-black">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-400">{product.name}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="bg-gray-100">
            <div className="aspect-w-1 aspect-h-1">
              <img 
                src={product.img || '/images/product/product-1.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4 p-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 bg-white">
                  <img 
                    src='/images/product/product-1.jpg'
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-75"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product__details__text">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">({product.rating} Reviews)</span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold">${product.price.toFixed(2)}</h3>
            </div>

            <p className="text-gray-600 mb-8">
              Premium quality {product.category.toLowerCase()} from {product.brand}. 
              Features modern design and excellent craftsmanship.
            </p>

            {/* Size Selection */}
            {product.category !== 'Accessories' && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Size:</h4>
                <div className="flex gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`px-4 py-2 border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold mb-3">Color:</h4>
              <div className="flex gap-3">
                {colors.map(color => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${color.class} ${
                      selectedColor === color.name
                        ? 'ring-2 ring-offset-2 ring-black'
                        : ''
                    }`}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-gray-300">
                <button
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-16 text-center border-x border-gray-300"
                  value={quantity}
                  readOnly
                />
                <button
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
              <button className="px-8 py-3 bg-black text-white hover:bg-gray-800"
               onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product, quantity);
              }}>
                ADD TO CART
              </button>
            </div>

            {/* Additional Options */}
            <div className="flex gap-6 mb-8 text-sm">
              <button className="flex items-center gap-2 hover:text-gray-600" onClick={() => handleAddToWishlist(product)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Add to Compare
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-8">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">SKU:</dt>
                  <dd>{sku}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Category:</dt>
                  <dd>{product.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Brand:</dt>
                  <dd>{product.brand}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b">
            <nav className="flex gap-8">
              {['Description', 'Additional Information', 'Reviews'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 text-lg font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-black'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'Description' && (
              <div className="prose max-w-none">
                <p className="text-lg mb-6">
                  Experience premium quality with this {product.brand} {product.category.toLowerCase()}. 
                  Crafted with attention to detail and using high-quality materials, this piece combines 
                  style and functionality.
                </p>
                <h3 className="text-xl font-semibold mb-4">Product Features</h3>
                <p>
                  This {product.name.toLowerCase()} showcases the best of {product.brand}'s craftsmanship, 
                  featuring premium materials and expert construction. Perfect for any occasion, it offers 
                  both style and comfort.
                </p>
              </div>
            )}
            {activeTab === 'Additional Information' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                <ul>
                  <li>Brand: {product.brand}</li>
                  <li>Color: {product.color}</li>
                  <li>Size: {product.size}</li>
                  <li>Category: {product.category}</li>
                  <li>SKU: {sku}</li>
                </ul>
              </div>
            )}
            {activeTab === 'Reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-600">
                    {product.rating} out of 5 stars
                  </p>
                </div>
                
                {/* Review Form */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                        Rating
                      </label>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="text-gray-300 hover:text-yellow-400"
                          >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                        Review
                      </label>
                      <textarea
                        id="review"
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: 'Sample Reviewer',
                      rating: 4,
                      date: '2 months ago',
                      comment: `Great ${product.category.toLowerCase()} from ${product.brand}! The quality is excellent and it fits perfectly. Would definitely recommend.`
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, starIndex) => (
                            <svg
                              key={starIndex}
                              className={`w-4 h-4 ${
                                starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">
                          {review.name}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="group">
                  <Link href={`/shop/${relatedProduct.id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedProduct.images && relatedProduct.images.length > 0 ? relatedProduct.images[0] : '/path/to/default/image.jpg'}
                        alt={relatedProduct.name}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className='border p-4'>
                    <h3 className="text-lg font-medium mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;





