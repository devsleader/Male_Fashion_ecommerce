import React from 'react';
import { BlogPost } from '@/types/types';

interface BlogDetailsHeroProps {
  blog: BlogPost;
}

const BlogDetailsHero: React.FC<BlogDetailsHeroProps> = ({ blog }) => {
  return (
    <section className="bg-[#f3f2ee] pt-32 pb-48 text-center">
      <div className="container">
        <h2 className="text-4xl font-bold mb-6">{blog.title}</h2>
        <ul className="flex justify-center  text-gray-600">
          <li className='px-4 border-r border-black'>By {blog.author}</li>
          <li className='px-4 border-r border-black'>{blog.date}</li>
          <li className='px-4'>{blog.comments} Comments</li>
        </ul>
      </div>
    </section>
  );
};

export default BlogDetailsHero;