// store/features/testimonialSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import testlogo from '@/img/about/testimonial-pic.jpg'
import { StaticImageData } from 'next/image';

interface TestimonialState {
  testimonials: Array<{
    id: number;
    quote: string;
    author: string;
    role: string;
    image: StaticImageData;
  }>;
}

const initialState: TestimonialState = {
  testimonials: [
    {
      id: 1,
      quote: "Going out after work? Take your butane curling iron with you to the office, heat it up, style your hair before you leave the office and you won't have to make a trip back home.",
      author: "Augusta Schultz",
      role: "Fashion Design",
      image: testlogo
    }
  ]
};

export const testimonialSlice = createSlice({
  name: 'testimonial',
  initialState,
  reducers: {
    addTestimonial: (state, action: PayloadAction<Omit<TestimonialState['testimonials'][0], 'id'>>) => {
      state.testimonials.push({
        id: state.testimonials.length + 1,
        ...action.payload
      });
    }
  }
});

export const { addTestimonial } = testimonialSlice.actions;
export default testimonialSlice.reducer;

