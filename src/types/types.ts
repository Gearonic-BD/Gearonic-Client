export type Product = {
  id: string;
  image: string;
  title: string;
  originalPrice: number;
  discountPrice: number | null;
  sold: number;
  totalStock: number;
  rating: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  href: string;
};
