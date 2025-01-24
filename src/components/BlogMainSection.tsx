import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { BlogPost } from '@/types/types';
import Calendarlogo from '@/img/icon/calendar.png';

const BlogMainSection: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog: BlogPost) => (
            <div key={blog.id} className="relative">
              <div className="relative h-64 -z-10">
                {blog.image ? (
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    layout="fill" 
                    // objectFit="cover"
                  />
                ) : (
                  <div className="h-full bg-gray-200 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>
              <div className="px-6 p-10 bg-white w-[80%] mx-auto mt-[-35px]">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Image 
                    src={Calendarlogo}
                    alt="Calendar" 
                    width={20} 
                    height={20} 
                    className="mr-2"
                  />
                  {blog.date}
                </div>
                <h5 className="text-xl font-bold mb-4">{blog.title}</h5>
                <Link href={`/blog/${blog.id}`}>
                  <span className="text-blue-500 hover:underline">Read More</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogMainSection;