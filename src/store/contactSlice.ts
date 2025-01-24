import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface ContactState {
  loading: boolean;
  error: string | null;
  success: boolean;
  locations: {
    id: number;
    country: string;
    address: string;
    phone: string;
  }[];
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
  locations: [
    {
      id: 1,
      country: 'America',
      address: '195 E Parker Square Dr, Parker, CO 801',
      phone: '+43 982-314-0958'
    },
    {
      id: 2,
      country: 'France',
      address: '109 Avenue Léon, 63 Clermont-Ferrand',
      phone: '+12 345-423-9893'
    }
  ]
};

export const sendContactForm = createAsyncThunk(
  'contact/sendMessage',
  async (formData: ContactForm) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return formData;
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetForm: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export const { resetForm } = contactSlice.actions;
export default contactSlice.reducer;