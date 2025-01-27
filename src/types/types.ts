import { StaticImageData } from "next/image";

export interface BlogPost {
    id: string;
    title: string;
    author: string;
    date: string;
    comments: number;
    image: string | StaticImageData | null;
    content: string[];
    content2: string[];
    quote: string;
    quoteBY: string;
    excerpt: string;
    tags: string[];
    heroImage: string;
    authorImage: string;
    slug: string;
  }

export interface CommentFormData {
  name: string;
  email: string;
  phone: string;
  comment: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  color: string;
  size: string;
  rating: number;
  sku?: string;
  description?: string;
  additionalInfo?: string;
  reviews?: ProductReview[];
  images?: string[];
  availableSizes?: string[];
  availableColors?: ColorOption[];
  stock?: number;
  quantity?: number;
}

export interface ProductReview {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ColorOption {
  name: string;
  class: string;
}
export interface FormData {
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  createAccount: boolean;
  password: string;
  orderNotes: string;
  paymentMethod: 'check' | 'paypal' | null;
}