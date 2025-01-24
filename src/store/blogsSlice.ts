import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost } from '@/types/types';
import blogsDataJson from '@/data/blog.json';
import blog1 from '@/img/blog/blog-1.jpg';
import blog2 from '@/img/blog/blog-2.jpg';
import blog3 from '@/img/blog/blog-3.jpg';
import blog4 from '@/img/blog/blog-4.jpg';
import blog5 from '@/img/blog/blog-5.jpg';
import blog6 from '@/img/blog/blog-6.jpg';
import blog7 from '@/img/blog/blog-7.jpg';
import blog8 from '@/img/blog/blog-8.jpg';
import blog9 from '@/img/blog/blog-9.jpg';

const blogsData: BlogPost[] = blogsDataJson.map(blog => ({
  ...blog,
  image: blog.id === "1" ? blog1 : blog.id === "2" ? blog2 : blog.id === "3" ? blog3 : blog.id === "4" ? blog4 : blog.id === "5" ? blog5 : blog.id === "6" ? blog6 : blog.id === "7" ? blog7 : blog.id === "8" ? blog8 : blog.id === "9" ? blog9 : null
}));

interface BlogState {
  blogs: BlogPost[];
  currentBlog: BlogPost | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: blogsData,
  currentBlog: null,
  loading: false,
  error: null
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCurrentBlog: (state, action: PayloadAction<string>) => {
      state.currentBlog = state.blogs.find(blog => blog.slug === action.payload) || null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setCurrentBlog, setLoading, setError } = blogSlice.actions;
export default blogSlice.reducer;