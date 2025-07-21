"use client"

import { sales } from "@/lib/data";
import { ReportTemplate } from "@/components/report-template";
import { useSettings } from "@/hooks/use-settings";

export default function XReportPage() {
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

  if (!isLoaded) {
    return <div>Loading report...</div>
  }

  return (
    <ReportTemplate title="X Report (Mid-Day Summary)">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-2">Sales Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Total Sales:</strong> {settings.currency} {reportData.totalSales.toFixed(2)}</p>
            <p><strong>Total Transactions:</strong> {reportData.totalTransactions}</p>
            <p><strong>Cash Sales:</strong> {settings.currency} {reportData.cashSales.toFixed(2)}</p>
            <p><strong>Card Sales:</strong> {settings.currency} {reportData.cardSales.toFixed(2)}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-2">Items Sold</h3>
          <ul className="list-disc pl-5 space-y-1">
            {Object.entries(reportData.itemsSold).map(([name, quantity]) => (
              <li key={name}><strong>{name}:</strong> {quantity}</li>
            ))}
          </ul>
        </div>
      </div>
    </ReportTemplate>
  );
}
