'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById } from '@/store/blogActions';
import { AppDispatch, RootState } from '@/store/store';
import BlogDetailsHero from '@/components/BlogDetailsHero';
import BlogDetailsSection from '@/components/BlogDetailsSection';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

const BlogDetailall: React.FC<BlogDetailProps> = ({ params }) => {
  const { slug } = React.use(params); // Unwrap params using React.use()

  const loading = useSelector((state: RootState) => state.blog.loading);
  const error = useSelector((state: RootState) => state.blog.error);
  const dispatch: AppDispatch = useDispatch();
  const currentBlog = useSelector((state: RootState) => state.blog.currentBlog);
  // Extract blog id from route params
  const blogId = slug ? Number(slug) : null;

  useEffect(() => {
    if (blogId) {
      dispatch(fetchBlogById(blogId));
    }
  }, [dispatch, blogId]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog: {error}</div>;
  if (!currentBlog) return <div>No blog found</div>;

  return (
    <>
      <BlogDetailsHero blog={currentBlog} />
      <BlogDetailsSection blog={currentBlog} />
    </>
  );
};

export default BlogDetailall;

