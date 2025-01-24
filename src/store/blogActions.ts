import { setCurrentBlog, setLoading, setError } from '@/store/blogsSlice';
import { AppDispatch } from './store';
import blogsData from '@/data/blog.json';

export const fetchBlogById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true)); // Set loading to true
    try {
      const blog = blogsData.find((b) => b.id === id.toString());
      if (blog) {
        dispatch(setCurrentBlog(blog.slug));
      } else {
        dispatch(setError('Blog not found'));
      }
    } catch (error) {
      dispatch(setError('Error fetching blog'));
    } finally {
      dispatch(setLoading(false)); // Set loading to false
    }
  };
}; 