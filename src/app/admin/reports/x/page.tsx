"use client"

import { ReportTemplate } from "@/components/report-template";
import { useSettings } from "@/hooks/use-settings";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useProductContext } from "@/hooks/use-product-context";


export default function XReportPage() {
  const { settings, isLoaded: settingsLoaded } = useSettings();
  const { sales, isLoaded: productsLoaded } = useProductContext();

  const reportData = sales.reduce((acc, sale) => {
    acc.totalSales += sale.total;
    acc.totalTransactions += 1;
    if (sale.paymentMethod === 'Card') {
      acc.cardSales += sale.total;
    } else {
      acc.cashSales += sale.total;
    }
    sale.items.forEach(item => {
      acc.itemsSold[item.product.name] = (acc.itemsSold[item.product.name] || 0) + item.quantity;
    });
    return acc;
  }, { 
    totalSales: 0,
    totalTransactions: 0, 
    cashSales: 0,
    cardSales: 0,
    itemsSold: {} as Record<string, number> 
  });

  if (!settingsLoaded || !productsLoaded) {
    return <div>Loading report...</div>
  }

  return (
    <ReportTemplate title="X Report (Mid-Day Summary)">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <p><strong>Total Sales:</strong> {settings.currency} {reportData.totalSales.toFixed(2)}</p>
            <p><strong>Total Transactions:</strong> {reportData.totalTransactions}</p>
            <p><strong>Cash Sales:</strong> {settings.currency} {reportData.cashSales.toFixed(2)}</p>
            <p><strong>Card Sales:</strong> {settings.currency} {reportData.cardSales.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items Sold</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(reportData.itemsSold).length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(reportData.itemsSold).map(([name, quantity]) => (
                  <li key={name}><strong>{name}:</strong> {quantity}</li>
                ))}
              </ul>
            ) : (
              <p>No items sold yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transactions Log</CardTitle>
            <CardDescription>A log of all sales transactions for the current period.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">No transactions yet.</TableCell>
                  </TableRow>
                )}
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.date.toLocaleTimeString()}</TableCell>
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>{sale.paymentMethod}</TableCell>
                    <TableCell className="text-right">{settings.currency} {sale.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="font-bold text-right">Total Sales</TableCell>
                  <TableCell className="font-bold text-right">{settings.currency} {reportData.totalSales.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ReportTemplate>
  );
}
