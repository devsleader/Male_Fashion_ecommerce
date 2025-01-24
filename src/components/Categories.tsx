'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setActiveCategory } from '@/store/categoriesSlice';
import Image from 'next/image';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, activeCategory } = useSelector((state: RootState) => state.categories);
  const currentCategory = categories[activeCategory];

  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(currentCategory.endTime);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentCategory.endTime]);

  const handleCategoryClick = (index: number) => {
    dispatch(setActiveCategory(index));
  };

  return (
    <section className="bg-[#f3f2ee] py-[150px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3">
            <div className="pt-10 relative z-10">
              {categories.map((category, index) => (
                <h2 
                  key={category.id}
                  onClick={() => handleCategoryClick(index)}
                  className={`text-[34px] leading-[72px] cursor-pointer transition-colors duration-300 ${
                    activeCategory === index ? 'text-black' : 'text-[#b7b7b7]'
                  }`}
                >
                  {category.title} 
                </h2>
              ))}
            </div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-4">
            <div className="relative">
              <Image 
                src={currentCategory.image} 
                alt="Product Sale" 
                className="w-full" 
                layout="responsive"
              />
              <div className="absolute right-0 top-[-36px] bg-black rounded-full w-[100px] h-[100px] flex flex-col items-center justify-center text-white">
                <span className="text-sm mb-1">Sale Of</span>
                <h5 className="text-xl font-bold">${currentCategory.price}</h5>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div>
              <span className="text-[#e53637] text-sm font-bold uppercase tracking-wider block mb-4">
                Deal Of The Week
              </span>
              <h2 className="text-2xl font-bold mb-6">{currentCategory.productName}</h2>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="text-center relative">
                  <span className="text-4xl font-bold block">{timeLeft.days}</span>
                  <p>Days</p>
                </div>
                <div className="text-center relative">
                  <span className="text-4xl font-bold block">{timeLeft.hours}</span>
                  <p>Hours</p>
                </div>
                <div className="text-center relative">
                  <span className="text-4xl font-bold block">{timeLeft.minutes}</span>
                  <p>Minutes</p>
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold block">{timeLeft.seconds}</span>
                  <p>Seconds</p>
                </div>
              </div>

              <a href="#" className="inline-block bg-black text-white text-sm font-bold uppercase tracking-wider py-4 px-8">
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;