"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Printer } from "lucide-react";

type ReportTemplateProps = {
  title: string;
  children: React.ReactNode;
};

export function ReportTemplate({ title, children }: ReportTemplateProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 no-print">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">Generated on {new Date().toLocaleString()}</p>
        </div>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> Print Report
        </Button>
      </div>
      
      <div className="printable-area">
        <Card className="border-dashed print:border-none print:shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>
              Veridian POS - Report Generated on: {new Date().toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
          <CardFooter className="print:hidden">
            <p className="text-sm text-muted-foreground">This is a preview. The printed version will be formatted for paper.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
