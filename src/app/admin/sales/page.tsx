"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/hooks/use-settings";
import { useProductContext } from "@/hooks/use-product-context";

export default function SalesHistoryPage() {
  const { settings, isLoaded: settingsLoaded } = useSettings();
  const { sales, isLoaded: productsLoaded } = useProductContext();

  if (!settingsLoaded || !productsLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>View a log of all completed transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">No sales recorded yet.</TableCell>
                </TableRow>
              )}
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date.toLocaleString()}</TableCell>
                  <TableCell>
                    {sale.items.map((item) => `${item.quantity}x ${item.product.name}`).join(", ")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={sale.paymentMethod === 'Card' ? 'default' : 'secondary'}>
                      {sale.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{settings.currency} {sale.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
