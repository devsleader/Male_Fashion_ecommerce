'use client'
import React, { useEffect } from 'react';
import BlogDetailsSection from '@/components/BlogDetailsSection';
import BlogDetailsHero from '@/components/BlogDetailsHero';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchBlogById } from '@/store/blogActions';

const BlogDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentBlog = useSelector((state: RootState) => state.blog.currentBlog);
  useEffect(() => {
    dispatch(fetchBlogById(1));
  }, [dispatch]);

  return (
    <>
      {currentBlog ? (
        <>
          <BlogDetailsHero blog={currentBlog} />
          <BlogDetailsSection blog={currentBlog} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BlogDetail;