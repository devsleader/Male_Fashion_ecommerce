'use client'
import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Menu, ShoppingCart, Heart, Search } from 'lucide-react';
import { RootState } from '@/store/store';
import logo from "@/img/logo.png";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const cartTotal = useSelector((state: RootState) => state.cart.total);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Offcanvas Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Header */}
      <header className={`w-full bg-white ${className}`}>
        {/* Top Bar */}
        <div className="bg-gray-900 py-2">
          <div className="container">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/2">
                <p className="text-white text-sm">Free shipping, 30-day return or refund guarantee.</p>
              </div>
              <div className="w-full md:w-1/2 flex justify-end items-center space-x-6">
                <div className="flex space-x-4">
                  <Link href="/signin" className="text-white text-sm uppercase tracking-wider hover:text-gray-300">
                    Sign in
                  </Link>
                  <Link href="/faqs" className="text-white text-sm uppercase tracking-wider hover:text-gray-300">
                    FAQs
                  </Link>
                </div>
                <div className="relative group">
                  <button className="text-white text-sm uppercase tracking-wider flex items-center">
                    {currency} <span className="ml-1">▼</span>
                  </button>
                  <ul className="absolute hidden group-hover:block right-0 bg-white shadow-lg py-2 mt-2 w-24 z-50">
                    {['USD', 'EUR'].map((curr) => (
                      <li 
                        key={curr}
                        className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setCurrency(curr)}
                      >
                        {curr}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="w-1/4">
              <Link href="/">
                <div className="my-8">
                  <Image 
                    src={logo} 
                    alt="Logo" 
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Shop', href: '/shop' },
                  // { name: 'Pages', href: '#', dropdown: [
                  //   { name: 'About Us', href: '/about' },
                  //   { name: 'Shop Details', href: '/shop-details' },
                  //   { name: 'Shopping Cart', href: '/cart' },
                  //   { name: 'Check Out', href: '/checkout' },
                  //   { name: 'Blog Details', href: '/blog-details' }
                  // ]},
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contacts', href: '/contact' }
                ].map((item) => (
                  <li key={item.name} className="relative group">
                    <Link 
                      href={item.href}
                      className="text-lg font-semibold hover:text-red-600 py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      {item.name}
                    </Link>
                    {/* {item.dropdown && (
                      <ul className="absolute hidden group-hover:block left-0 bg-gray-900 w-48 py-2 mt-2 z-50">
                        {item.dropdown.map((dropItem) => (
                          <li key={dropItem.name}>
                            <Link 
                              href={dropItem.href}
                              className="block px-4 py-2 text-white hover:bg-gray-800"
                            >
                              {dropItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )} */}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Cart and Search */}
            <div className="flex items-center space-x-6">
              <button className="hover:text-red-600">
                <Search className="w-6 h-6" />
              </button>
              <Link href="/wishlist" className="relative hover:text-red-600">
                <Heart className="w-6 h-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <div className="relative">
                <Link href="/cart" className="hover:text-red-600">
                  <ShoppingCart className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
              <button 
                className="md:hidden"
                onClick={toggleMobileMenu}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              <nav className="mt-8">
                <ul className="space-y-4">
                  {[
                    { name: 'Home', href: '/' },
                    { name: 'Shop', href: '/shop' },
                    { name: 'Pages', href: '#' },
                    { name: 'Blog', href: '/blog' },
                    { name: 'Contacts', href: '/contact' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="block text-lg font-semibold hover:text-red-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;