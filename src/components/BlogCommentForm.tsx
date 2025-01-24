import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Assume you have a commentSlice for Redux
import { submitComment } from '@/store/commentSlice';
import { CommentFormData } from '@/types/types'; // Ensure this import is correct

const BlogCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<CommentFormData>({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(submitComment(formData));
  };

  return (
    <div className="blog-comment-section">
      <h4 className="text-center text-gray-800 font-bold text-xl mb-9">
        Leave A Comment
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-12 border border-gray-300 px-5 text-sm text-gray-500 focus:border-black transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 border border-gray-300 px-5 text-sm text-gray-500 focus:border-black transition-all"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full h-12 border border-gray-300 px-5 text-sm text-gray-500 focus:border-black transition-all"
          />
        </div>
        <div className="text-center">
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full h-30 border border-gray-300 p-5 text-sm text-gray-500 mb-6 resize-none focus:border-black transition-all"
          />
          <button 
            type="submit" 
            className="bg-black text-white py-3.5 px-9 tracking-widest hover:bg-gray-800 transition-all"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCommentForm;