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
}

    