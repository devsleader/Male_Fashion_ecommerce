import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommentFormData } from '@/types/types'; // Adjust the import based on your structure

export interface CommentState {
  comments: Array<{
    id?: string;
    name: string;
    email: string;
    phone: string;
    comment: string;
  }>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const submitComment = createAsyncThunk(
  'comments/submitComment',
  async (formData: CommentFormData) => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to submit comment');
    }
    return await response.json();
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
  } as CommentState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments.push(action.payload);
      })
      .addCase(submitComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to submit comment';
      });
  },
});

export default commentSlice.reducer;