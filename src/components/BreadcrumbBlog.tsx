import React from 'react';
import Image from 'next/image';
import backgroundImage from '@/img/breadcrumb-bg.jpg';

interface BreadcrumbBlogProps {
  title?: string;
}

const BreadcrumbBlog: React.FC<BreadcrumbBlogProps> = ({ 
  title = 'Our Blog'
}) => {
  return (
    <section 
      className="relative bg-cover bg-center h-96 flex items-center justify-center"
      style={{ 
        backgroundImage: `url(${backgroundImage.src})`
      }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white">{title}</h2>
      </div>
    </section>
  );
};

export default BreadcrumbBlog;