import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/types';

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const {  removeFromWishlist } = wishlistSlice.actions;
export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;