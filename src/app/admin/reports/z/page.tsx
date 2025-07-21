"use client"

import { sales } from "@/lib/data";
import { ReportTemplate } from "@/components/report-template";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { useSettings } from "@/hooks/use-settings";

export default function ZReportPage() {
  const { settings, isLoaded } = useSettings();

  const reportData = sales.reduce((acc, sale) => {
    acc.totalSales += sale.total;
    acc.totalTransactions += 1;
    if (sale.paymentMethod === 'Card') {
      acc.cardSales += sale.total;
    } else {
      acc.cashSales += sale.total;
    }
    sale.items.forEach(item => {
      const category = item.product.category;
      acc.salesByCategory[category] = (acc.salesByCategory[category] || 0) + (item.product.price * item.quantity);
    });
    return acc;
  }, { 
    totalSales: 0,
    totalTransactions: 0, 
    cashSales: 0,
    cardSales: 0,
    salesByCategory: {} as Record<string, number> 
  });
  
  if (!isLoaded) {
    return <div>Loading report...</div>
  }

  return (
    <ReportTemplate title="Z Report (End-of-Day)">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-2">Grand Totals</h3>
          <div className="grid grid-cols-2 gap-4 text-xl">
            <p><strong>Total Sales:</strong></p><p className="text-right font-bold">{settings.currency} {reportData.totalSales.toFixed(2)}</p>
            <p><strong>Total Transactions:</strong></p><p className="text-right font-bold">{reportData.totalTransactions}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-2">Payment Methods</h3>
           <div className="grid grid-cols-2 gap-4">
            <p><strong>Cash Sales:</strong></p><p className="text-right">{settings.currency} {reportData.cashSales.toFixed(2)}</p>
            <p><strong>Card Sales:</strong></p><p className="text-right">{settings.currency} {reportData.cardSales.toFixed(2)}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Sales by Category</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(reportData.salesByCategory).map(([category, total]) => (
                <TableRow key={category}>
                  <TableCell className="capitalize">{category}</TableCell>
                  <TableCell className="text-right">{settings.currency} {total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{settings.currency} {reportData.totalSales.toFixed(2)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="text-center text-muted-foreground pt-8">
            <p>End of Business Day. Totals have been finalized and reset.</p>
        </div>
      </div>
    </ReportTemplate>
  );
}
