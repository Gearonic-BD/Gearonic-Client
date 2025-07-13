export interface Variant {
  id: string;
  color: string;
  price: number;
  stock: number;
  image: string;
}

export interface Product {
  id: string;
  images: string[];
  category: string;
  brand: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  hasvariants: boolean;
  sold: number;
  totalStock: number;
  rating: number;
  variants: Variant[];
  features: string[];
}
