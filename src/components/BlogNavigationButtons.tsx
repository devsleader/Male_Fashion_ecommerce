import React from 'react';
import Link from 'next/link';

interface BlogNavigationButtonsProps {
  previousBlogId?: string;
  nextBlogId?: string;
  previousBlogTitle?: string;
  nextBlogTitle?: string;
}

const BlogNavigationButtons: React.FC<BlogNavigationButtonsProps> = ({ 
  previousBlogId, 
  nextBlogId,
  previousBlogTitle,
  nextBlogTitle
}) => {
  return (
    <div className="flex justify-between mt-8">
      {previousBlogId ? (
        <Link 
          href={`/blog/${previousBlogId}`} 
          className="btn bg-[#f0f0f0] px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors"
        >
          Previous: {previousBlogTitle}
        </Link>
      ) : (
        <div className="text-gray-400">No Previous Post</div>
      )}

      {nextBlogId ? (
        <Link 
          href={`/blog/${nextBlogId}`} 
          className="btn bg-[#f0f0f0] px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors"
        >
          Next: {nextBlogTitle}
        </Link>
      ) : (
        <div className="text-gray-400">No Next Post</div>
      )}
    </div>
  );
};

export default BlogNavigationButtons;