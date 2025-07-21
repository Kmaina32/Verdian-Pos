
"use client";

import React from 'react';
import type { CartItem, AppSettings } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

type ReceiptProps = {
  cart: CartItem[];
  total: number;
  settings: AppSettings;
};

export function Receipt({ cart, total, settings }: ReceiptProps) {
  const templateStyle = {
    modern: {
      card: "font-sans",
      header: "text-center pb-4",
      title: "text-2xl font-bold tracking-wider uppercase",
      details: "text-sm text-muted-foreground",
      table: "w-full text-sm",
      th: "text-left font-semibold py-1 border-b-2 border-dashed",
      td: "py-1",
      footer: "pt-4 border-t-2 border-dashed"
    },
    classic: {
      card: "font-mono",
      header: "text-center pb-2 mb-2 border-b-2 border-dashed",
      title: "text-xl font-semibold",
      details: "text-xs",
      table: "w-full text-xs",
      th: "text-left font-normal py-1 border-b",
      td: "py-1",
      footer: "pt-2 border-t"
    }
  }[settings.receiptTemplate];

  return (
    <div className="printable-area bg-white text-black p-4 max-w-sm mx-auto">
      <div className={cn("receipt-card", templateStyle.card)}>
        <header className={templateStyle.header}>
            <h1 className={templateStyle.title}>{settings.receiptName}</h1>
            <p className={templateStyle.details}>Sale Receipt</p>
            <p className={templateStyle.details}>{new Date().toLocaleString()}</p>
        </header>

        <section>
          <table className={templateStyle.table}>
            <thead>
              <tr>
                <th className={cn(templateStyle.th, 'w-1/2')}>Item</th>
                <th className={cn(templateStyle.th, 'text-center')}>Qty</th>
                <th className={cn(templateStyle.th, 'text-right')}>Price</th>
                <th className={cn(templateStyle.th, 'text-right')}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.product.id}>
                  <td className={templateStyle.td}>{item.product.name}</td>
                  <td className={cn(templateStyle.td, 'text-center')}>{item.quantity}</td>
                  <td className={cn(templateStyle.td, 'text-right')}>{item.product.price.toFixed(2)}</td>
                  <td className={cn(templateStyle.td, 'text-right')}>{(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className={templateStyle.footer}>
            <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{settings.currency} {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
                <span>Tax (0%)</span>
                <span>{settings.currency} 0.00</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2">
                <span>Total</span>
                <span>{settings.currency} {total.toFixed(2)}</span>
            </div>
            <p className="text-center text-xs mt-4">
                Thank you for your purchase!
            </p>
        </footer>
      </div>
    </div>
  );
}
