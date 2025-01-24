import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Img from '@/img/product-sale.png'
import { StaticImageData } from 'next/image';

interface CategoryItem {
  id: number;
  title: string;
  image: StaticImageData;
  price: number;
  productName: string;
  endTime: string;
}

interface CategoriesState {
  activeCategory: number;
  categories: CategoryItem[];
}

const initialState: CategoriesState = {
  activeCategory: 0,
  categories: [
    {
      id: 0,
      title: "Clothings Hot",
      image: Img,
      price: 29.99,
      productName: "Multi-pocket Chest Bag Black",
      endTime: "2025-02-02T23:59:59Z",
    },
    {
      id: 1,
      title: "Shoe Collection",
      image: Img,
      price: 49.99,
      productName: "Luxury Watch Collection",
      endTime: "2025-02-12T23:59:59Z",
    },
    {
        id: 2,
        title: "Accessories",
        image: Img,
        price: 39.99,
        productName: "Luxury Watch Collection",
        endTime: "2025-02-07T23:59:59Z",
      },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;