import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/cartSlice';
import newsletterReducer from '@/store/newsletterSlice';
import categoriesReducer from '@/store/categoriesSlice';
import contactReducer from '@/store/contactSlice';
import testimonialReducer from '@/store/testimonialSlice';
import blogsReducer from '@/store/blogsSlice';
import commentReducer from './commentSlice'; 
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    newsletter: newsletterReducer, 
    categories: categoriesReducer,  
    contact: contactReducer, 
    testimonial: testimonialReducer,
    blogs: blogsReducer,
    comments: commentReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(/* other middlewares if any */),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;