import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      title: 'X Report',
      description: 'A summary of sales for the current period without closing the business day. Useful for shift changes.',
      href: '/admin/reports/x',
    },
    {
      title: 'Z Report',
      description: 'The end-of-day report that closes the business day. This report finalizes totals and resets for the next day.',
      href: '/admin/reports/z',
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Sales Reports</h1>
        <p className="text-muted-foreground">Generate and view detailed sales reports.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.title}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> {report.title}</CardTitle>
                  <CardDescription className="mt-2">{report.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href={report.href}>
                <Button>
                  Generate Report <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
