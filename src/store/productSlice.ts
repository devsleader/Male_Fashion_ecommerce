import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/types';
import productsData from '../data/products.json';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  filters: {
    category?: string;
    brand?: string;
    priceRange?: { min: number; max: number };
    size?: string;
    color?: string;
  };
  searchTerm: string;
}

const initialState: ProductState = {
  products: productsData,
  filteredProducts: productsData,
  filters: {},
  searchTerm: ''
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<typeof state.filters>) {
      state.filters = action.payload;
      state.filteredProducts = state.products.filter(product => {
        const matchCategory = !state.filters.category || product.category === state.filters.category;
        const matchBrand = !state.filters.brand || product.brand === state.filters.brand;
        const matchPrice = !state.filters.priceRange ||
          (product.price >= state.filters.priceRange.min &&
           product.price <= state.filters.priceRange.max);
        const matchSize = !state.filters.size || product.size === state.filters.size;
        const matchColor = !state.filters.color || product.color === state.filters.color;
        
        return matchCategory && matchBrand && matchPrice && matchSize && matchColor;
      });
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.filteredProducts = state.products.filter(product =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }
  }
});

// Ensure these exports are present and correctly specified
export const { setFilters, setSearchTerm } = productSlice.actions;
export default productSlice.reducer;