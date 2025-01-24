'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import bannerImg1 from '@/img/banner/banner-1.jpg'
import bannerImg2 from '@/img/banner/banner-2.jpg'
import bannerImg3 from '@/img/banner/banner-3.jpg'

const BannerSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-11 col-start-9"
          >
            <div className="relative overflow-hidden group">
              <div className="relative w-full">
                <Image
                  src={bannerImg1}
                  alt="Clothing Collections 2030"
                  className="transition-transform duration-700 group-hover:scale-105 w-full aspect-4/3" 
                />
              </div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-[300px]">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                  Clothing Collections 2030
                </h2>
                <Link
                  href="/shop"
                  className="inline-block text-sm font-bold uppercase tracking-wider text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-10 hover:after:bg-red-600"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-7 col-start-1 row-start-2"
          >
            <div className="relative overflow-hidden group mt-[-135px]">
              <div className="relative w-full">
                <Image
                  src={bannerImg2}
                  alt="Accessories"
                  className="transition-transform duration-700 group-hover:scale-105 w-full aspect-4/3"
                  
                />
              </div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-[300px]">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight ">
                  Accessories
                </h2>
                <Link
                  href="/shop"
                  className="inline-block text-sm font-bold uppercase tracking-wider text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-10 hover:after:bg-red-600"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-12 col-start-10 row-start-2"
          >
            <div className="relative overflow-hidden group">
              <div className="relative w-full">
                <Image
                  src={bannerImg3}
                  alt="Shoes Spring 2030"
                  
                  className=" transition-transform duration-700 group-hover:scale-105 w-full aspect-4/3"
                 
                />
              </div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-[300px]">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                  Shoes Spring 2030
                </h2>
                <Link
                  href="/shop"
                  className="inline-block text-sm font-bold uppercase tracking-wider text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-10 hover:after:bg-red-600"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;