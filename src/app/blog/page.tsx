'use client'
import React from 'react';
import Head from 'next/head';
import BreadcrumbBlog from '@/components/BreadcrumbBlog';
import BlogMainSection from '@/components/BlogMainSection';

const BlogPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Blog</title>
        <meta name="description" content="Explore our latest blog posts" />
      </Head>
      <BreadcrumbBlog 
        title="Our Blog" 
        // backgroundImage="/images/breadcrumb-bg.jpg" 
      />
      <BlogMainSection />
    </>
  );
};

export default BlogPage;