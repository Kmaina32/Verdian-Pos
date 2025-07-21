"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product, SaleTransaction } from '@/lib/types';
import { useToast } from './use-toast';

interface ProductContextType {
  products: Product[];
  sales: SaleTransaction[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addSale: (sale: SaleTransaction) => void;
  isLoaded: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<SaleTransaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('appProducts');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
      const storedSales = localStorage.getItem('appSales');
      if (storedSales) {
        // Dates need to be revived from string format
        const parsedSales = JSON.parse(storedSales).map((s: SaleTransaction) => ({
            ...s,
            date: new Date(s.date)
        }));
        setSales(parsedSales);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    try {
      localStorage.setItem('appProducts', JSON.stringify(newProducts));
      setProducts(newProducts);
    } catch (error) {
      console.error("Failed to save products to localStorage", error);
    }
  };

  const saveSales = (newSales: SaleTransaction[]) => {
    try {
      localStorage.setItem('appSales', JSON.stringify(newSales));
      setSales(newSales);
    } catch (error) {
      console.error("Failed to save sales to localStorage", error);
    }
  };

  const addProduct = (product: Product) => {
    const newProducts = [...products, product];
    saveProducts(newProducts);
    toast({ title: "Product Added", description: `${product.name} has been added to the inventory.` });
  };

  const updateProduct = (updatedProduct: Product) => {
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    saveProducts(newProducts);
    toast({ title: "Product Updated", description: `${updatedProduct.name} has been updated.` });
  };

  const deleteProduct = (productId: string) => {
    const newProducts = products.filter(p => p.id !== productId);
    saveProducts(newProducts);
    toast({ title: "Product Deleted", description: "The product has been removed from inventory." });
  };

  const addSale = (sale: SaleTransaction) => {
    const newSales = [...sales, sale];
    saveSales(newSales);
  };

  return (
    <ProductContext.Provider value={{ products, sales, addProduct, updateProduct, deleteProduct, addSale, isLoaded }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
