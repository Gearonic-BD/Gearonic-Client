// types/product.ts

export type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string | null;
  createdAt: string; // ISO Date string
  user: User;
  date: string;
};

export type Question = {
  id: string;
  userId: string;
  productId: string;
  question: string;
  answer?: string | null;
  createdAt: string;
  user: Partial<User> | null;
  answerDate?: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string;
};

export type Specification = {
  name: string;
  specs: { key: string; value: string }[];
};

export type Category = {
  id?: string | number;
  name: string;
  image?: string;
  href: string;
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
  specifications: Specification[];
  createdAt: string;
  updatedAt: string;
  isFlashSale: boolean;
  flashSaleEnd?: string | null;
  variants: Variant[] | [];
  questions: Question[] | [];
  reviews: Review[] | [];
  flashSaleStock?: number;
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
    totalStock: number;
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

export type OrderItem = {
  id: string;
  productTitle: string;
  productBrand: string;
  productImage: string;
  variantColor?: string;
  variantImage?: string;
  quantity: number;
  price: number;
  originalPrice: number;
};

export type Payment = {
  method: "bkash" | "nagad" | "cod" | "card"; // extend as needed
  transactionId?: string;
  accountNumber?: string;
  amount: number;
  status: "pending" | "completed" | "failed";
};

export type Shipping = {
  address: string;
  mobile: string;
  name: string;
  zone: "outside" | "inside";
};

export type Order = {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  totalQuantity: number;
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: "bkash" | "nagad" | "cod" | "card"; // same as in Payment
  createdAt: string; // ISO timestamp
  items: OrderItem[];
  payment: Payment;
  shipping: Shipping;
};
