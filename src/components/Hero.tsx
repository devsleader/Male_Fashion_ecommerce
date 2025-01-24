'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { MoveLeft, MoveRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import HeroImg1 from '@/img/hero/hero-1.jpg'
import HeroImg2 from '@/img/hero/hero-2.jpg'

interface HeroSlide {
  image: StaticImageData;
  subtitle: string;
  title: string;
  description: string;
}

const slides: HeroSlide[] = [
  {
    image: HeroImg1,
    subtitle: 'Summer Collection',
    title: 'Fall - Winter Collections 2030',
    description: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.',
  },
  {
    image: HeroImg2,
    subtitle: 'Summer Collection',
    title: 'Fall - Winter Collections 2030',
    description: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.',
  },
];

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <section className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative h-[800px]"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/10">
                <div className="container">
                  <div className="flex items-center h-full">
                    <div className="w-full md:w-2/3 lg:w-1/2 pt-36">
                      <div className={`transition-all duration-300 ${
                        currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        <h6 className="text-red-600 text-sm font-bold uppercase tracking-widest mb-7">
                          {slide.subtitle}
                        </h6>
                        <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-8">
                          {slide.title}
                        </h2>
                        <p className="text-lg text-gray-800 mb-9">
                          {slide.description}
                        </p>
                        <Link 
                          href="/shop"
                          className="inline-flex items-center px-8 py-4 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-red-600 transition-colors duration-300"
                        >
                          Shop now
                          <MoveRight className="ml-2 w-5 h-5" />
                        </Link>
                        
                        <div className="mt-48 flex space-x-8">
                          <Link href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                            <Facebook className="w-6 h-6" />
                          </Link>
                          <Link href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                            <Twitter className="w-6 h-6" />
                          </Link>
                          <Link href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                            <Linkedin className="w-6 h-6" />
                          </Link>
                          <Link href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                            <Instagram className="w-6 h-6" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors duration-300"
      >
        <MoveLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors duration-300"
      >
        <MoveRight className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;