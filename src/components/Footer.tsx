'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToNewsletter } from '@/store/newsletterSlice';
import Footerlogo from '@/img/footer-logo.png'
import FooterCards from '@/img/payment.png'

const Footer = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(subscribeToNewsletter(email));
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Link href="/">
                <Image
                  src={Footerlogo}
                  alt="Footer Logo"
                  width={150}
                  height={50}
                  className="cursor-pointer"
                />
              </Link>
            </div>
            <p className="text-gray-400">
              The customer is at the heart of our unique business model, which includes design.
            </p>
            <div>
              <Image
                src={FooterCards}
                alt="Payment Methods"
                width={200}
                height={30}
              />
            </div>
          </div>

          {/* Shopping Links */}
          <div>
            <h6 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Shopping
            </h6>
            <ul className="space-y-3">
              {['Clothing Store', 'Trending Shoes', 'Accessories', 'Sale'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shopping Info */}
          <div>
            <h6 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Shopping
            </h6>
            <ul className="space-y-3">
              {[
                'Contact Us',
                'Payment Methods',
                'Delivery',
                'Return & Exchanges'
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h6 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Newsletter
            </h6>
            <div>
              <p className="text-gray-400 mb-4">
                Be the first to know about new arrivals, look books, sales & promos!
              </p>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent border-b-2 border-white py-3 px-0 text-gray-400 placeholder-gray-500 focus:outline-none focus:border-red-600"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-2 text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 py-6 border-t border-gray-800">
          <p className="text-center text-gray-400">
            Copyright © {new Date().getFullYear()} All rights reserved | This template is made with{' '}
            <span className="text-red-600">♥</span> by{' '}
            <a
              href="https://colorlib.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-500"
            >
              Colorlib
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;