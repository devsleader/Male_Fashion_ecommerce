import React from 'react';
import Image from 'next/image';
import { BlogPost } from '@/types/types';

interface BlogDetailsSectionProps {
  blog: BlogPost;
}

const BlogDetailsSection: React.FC<BlogDetailsSectionProps> = ({ blog }) => {
  return (
    <section className="pb-16 mt-[-150px]">
      <div className="container">
        <div className="mb-8">
          {blog.image ? (
            <Image 
              src={blog.image} 
              alt={blog.title} 
              width={1200} 
              height={600} 
              className="rounded-lg"
            />
          ) : (
            <div className="h-full bg-gray-200 flex items-center justify-center">
              <span>No Image Available</span>
            </div>
          )}
        </div>
        
        {blog.content.map((paragraph, index) => (
          <p key={index} className="mb-6 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}

        {blog.content2 && blog.content2.map((paragraph, index) => (
          <p key={index} className="mb-6 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}

        <div className="mt-12 border-t pt-6 flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src={blog.authorImage} 
              alt={blog.author} 
              width={60} 
              height={60} 
              className="rounded-full mr-4"
            />
            <h5 className="font-bold">{blog.author}</h5>
          </div>
          
          <div className="">
            {blog.tags.map((tag) => (
              <a 
                key={tag} 
                href="#" 
                className="px-4 font-bold"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsSection;