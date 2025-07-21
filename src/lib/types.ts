export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type SaleTransaction = {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  paymentMethod: 'Cash' | 'Card';
};
