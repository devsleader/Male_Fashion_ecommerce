import React from 'react';
import Image from 'next/image';
import { BlogPost } from '@/types/types';
import BlogNavigationButtons from './BlogNavigationButtons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import BlogCommentForm from './BlogCommentForm';
import SocialShareLinks from './SocialShareLinks';
import logo from '@/img/blog/details/blog-author.jpg'

interface BlogDetailsSectionProps {
  blog: BlogPost;
}

const BlogDetailsSection: React.FC<BlogDetailsSectionProps> = ({ blog }) => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const currentIndex = blogs.findIndex(b => b.slug === blog.slug);

  const previousBlog = currentIndex > 0 ? blogs[currentIndex - 1] : undefined;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : undefined;

  const previousBlogId = previousBlog?.id;
  const nextBlogId = nextBlog?.id;
  const previousBlogTitle = previousBlog?.title;
  const nextBlogTitle = nextBlog?.title;

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
        <div className='flex w-full'>
          <div className="w-[15%] text-center px-4">
            <SocialShareLinks />
          </div>
          <div className="w-[85%] px-4">
                {blog.content.map((paragraph, index) => (
                <p key={index} className="mb-6 text-lg leading-relaxed">
                  {paragraph}
                </p>
                ))}
                
                <div className='my-4 p-8 bg-[#f3f2ee]'>
                  <p>{blog.quote}</p>
                  <p className='pt-4'>{blog.quoteBY}</p>
                </div>

                { blog.content2.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                <div className="mt-12 border-t pt-6 flex justify-between items-center">
                <div className="flex items-center">
                  <Image 
                    // src={blog.authorImage} 
                    src={logo}
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
              
                <BlogNavigationButtons 
                  previousBlogId={previousBlogId} 
                  nextBlogId={nextBlogId} 
                  previousBlogTitle={previousBlogTitle}
                  nextBlogTitle={nextBlogTitle}
                />
               <BlogCommentForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsSection;