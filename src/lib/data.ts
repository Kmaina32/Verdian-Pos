import type { Product, SaleTransaction } from './types';

export const products: Product[] = [
  { id: '1', name: 'Espresso', price: 2.50, stock: 100, category: 'coffee', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '2', name: 'Latte', price: 3.50, stock: 100, category: 'coffee', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '3', name: 'Cappuccino', price: 3.50, stock: 100, category: 'coffee', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '4', name: 'Iced Coffee', price: 3.00, stock: 100, category: 'coffee beverage', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '5', name: 'Croissant', price: 2.75, stock: 50, category: 'pastry', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '6', name: 'Muffin', price: 2.25, stock: 50, category: 'pastry', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '7', name: 'Bagel with Cream Cheese', price: 3.75, stock: 40, category: 'bakery', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '8', name: 'Orange Juice', price: 4.00, stock: 60, category: 'beverage', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '9', name: 'Green Tea', price: 2.25, stock: 80, category: 'beverage tea', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '10', name: 'Breakfast Sandwich', price: 5.50, stock: 30, category: 'food sandwich', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '11', name: 'Granola Parfait', price: 4.50, stock: 25, category: 'food breakfast', imageUrl: 'https://placehold.co/400x400.png' },
  { id: '12', name: 'Bottled Water', price: 1.50, stock: 200, category: 'beverage', imageUrl: 'https://placehold.co/400x400.png' },
];

export const sales: SaleTransaction[] = [
  { 
    id: 'SALE001', 
    items: [{ product: products[1], quantity: 1 }, { product: products[4], quantity: 1 }], 
    total: 6.25, 
    date: new Date('2023-10-27T09:30:00'),
    paymentMethod: 'Card',
  },
  { 
    id: 'SALE002', 
    items: [{ product: products[0], quantity: 2 }], 
    total: 5.00, 
    date: new Date('2023-10-27T09:45:00'),
    paymentMethod: 'Cash',
  },
  { 
    id: 'SALE003', 
    items: [{ product: products[2], quantity: 1 }, { product: products[5], quantity: 1 }, { product: products[8], quantity: 1 }], 
    total: 8.00, 
    date: new Date('2023-10-27T10:15:00'),
    paymentMethod: 'Card',
  },
  {
    id: 'SALE004',
    items: [{ product: products[9], quantity: 1 }, { product: products[3], quantity: 1 }],
    total: 8.50,
    date: new Date('2023-10-27T12:05:00'),
    paymentMethod: 'Card',
  },
  {
    id: 'SALE005',
    items: [{ product: products[7], quantity: 2 }],
    total: 8.00,
    date: new Date('2023-10-27T13:30:00'),
    paymentMethod: 'Cash',
  }
];
