// src/redux/features/newsletterSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const subscribeToNewsletter = createAsyncThunk(
  'newsletter/subscribe',
  async (email: string) => {
    // Your async logic here, e.g., API call
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json(); // or handle the response as needed
  }
);

interface NewsletterState {
  subscribers: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsletterState = {
  subscribers: [],
  status: 'idle',
  error: null,
};

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscribers.push(action.payload.email);
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default newsletterSlice.reducer;