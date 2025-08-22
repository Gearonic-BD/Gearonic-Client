// types/product.ts

export type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string | null;
  createdAt: string; // ISO Date string
  user: string;
  date: string;
};

export type Question = {
  id: string;
  userId: string;
  productId: string;
  question: string;
  answer?: string | null;
  createdAt: string; // ISO Date string
  user: string;
  date: string;
  answerDate?: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  images: string[];
  category: string;
  brand: string;
  originalPrice: number;
  discountPrice?: number | null;
  sold: number;
  hasVariants: boolean;
  totalStock: number;
  rating?: number;
  description: string;
  features: string[];
  specifications: Record<string, Record<string, string>>;
  createdAt: string;
  updatedAt: string;
  isFlashSale: boolean;
  flashSaleEnd?: string | null;
  variants: Variant[] | [];
  questions: Question[] | [];
  reviews: Review[] | [];
};

export type Variant = {
  id: string;
  productId: string;
  color?: string | null;
  name: string;
  price: number;
  stock: number;
  image?: string;
  size?: string | null;
};

export type BackendCartItem = {
  id: number;
  productId: string;
  variantId: string | null;
  quantity: number;
  price: number;
  originalPrice: number;
  product: {
    title: string;
    brand: string;
    images: string[];
    slug: string;
  };
  variant: {
    id: string;
    price: number;
    stock: number;
    image: string;
  } | null;
};
