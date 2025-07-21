import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Veridian POS Home">
      <div className="bg-primary p-2 rounded-lg">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">Veridian POS</span>
    </div>
  );
}
