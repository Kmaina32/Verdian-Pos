"use client";

import { Leaf } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { Skeleton } from './ui/skeleton';

export function Logo() {
  const { settings, isLoaded } = useSettings();

  return (
    <div className="flex items-center gap-2" aria-label={`${settings.receiptName} Home`}>
      <div className="bg-primary p-2 rounded-lg">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      {isLoaded ? (
        <span className="text-xl font-bold tracking-tight text-foreground">{settings.receiptName}</span>
      ) : (
        <Skeleton className="h-6 w-32" />
      )}
    </div>
  );
}
