
'use client'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Quote } from 'lucide-react';
import TestImgBg from '@/img/about/testimonial-pic.jpg'
import Image from 'next/image';

 const Testimonial = () => {
  const testimonials = useSelector((state: RootState) => state.testimonial.testimonials);

  return (
    <section className=" grid grid-cols-1 md:grid-cols-2">
      <div className="container mx-auto">
          <div className="p-12 md:p-20 text-center">
            <Quote className="text-red-600 w-16 h-16 mx-auto mb-6" />
            {testimonials.map((testimonial) => (
              <div key={testimonial.id}>
                <p className="text-gray-900 text-lg italic mb-8">{testimonial.quote}</p>
                <div className="flex items-center justify-center">
                  <div className="mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-16 h-16 rounded-full"
                      layout="fixed"
                    />
                  </div>
                  <div className="text-left">
                    <h5 className="font-bold text-gray-900">{testimonial.author}</h5>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
      <div className="h-[600px] bg-[#f3f2ee] bg-cover bg-center bg-no-repeat">
           <Image 
            src={TestImgBg} 
            alt="BG"
            className="w-full h-[600px]"
            
             />
      </div>
    </section>
  );
};
export default Testimonial;