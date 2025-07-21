"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingCart, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/data";
import type { CartItem, Product } from "@/lib/types";
import { Logo } from "@/components/logo";
import { useSettings } from "@/hooks/use-settings";

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { settings, isLoaded } = useSettings();

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const completeSale = () => {
    if (cart.length === 0) {
      toast({
        variant: "destructive",
        title: "Cart is empty",
        description: "Add items to the cart to complete a sale.",
      });
      return;
    }
    // In a real app, this would process payment and save the transaction
    console.log("Sale completed:", { cart, total: cartTotal });
    toast({
      title: "Sale Complete!",
      description: `Total: ${settings.currency} ${cartTotal.toFixed(2)}`,
    });
    setCart([]);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <Logo />
          <Link href="/admin/inventory">
            <Button variant="outline">
              <Settings className="mr-2" /> Admin Dashboard
            </Button>
          </Link>
        </header>
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => addToCart(product)}>
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      data-ai-hint={product.category}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{settings.currency} {product.price.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <aside className="w-full max-w-sm border-l bg-card flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold flex items-center"><ShoppingCart className="mr-2" /> Current Order</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="w-16 h-16 mb-4" />
              <p>Your cart is empty.</p>
              <p className="text-sm">Click products to add them.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.product.id} className="flex items-center gap-4">
                  <Image src={item.product.imageUrl} alt={item.product.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.product.category} />
                  <div className="flex-1">
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">{settings.currency} {item.product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                      <span>{item.quantity}</span>
                      <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{settings.currency} {(item.product.price * item.quantity).toFixed(2)}</p>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t mt-auto bg-card space-y-4">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>{settings.currency} {cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Tax (0%)</span>
            <span>{settings.currency} 0.00</span>
          </div>
          <Separator />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>{settings.currency} {cartTotal.toFixed(2)}</span>
          </div>
          <Button size="lg" className="w-full" onClick={completeSale}>
             Complete Sale
          </Button>
        </div>
      </aside>
    </div>
  );
}
