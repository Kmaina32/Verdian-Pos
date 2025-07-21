"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Printer } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";

type ReportTemplateProps = {
  title: string;
  children: React.ReactNode;
};

export function ReportTemplate({ title, children }: ReportTemplateProps) {
  const { settings, isLoaded } = useSettings();
  
  const handlePrint = () => {
    window.print();
  };

  if (!isLoaded) {
    return <div>Loading template...</div>;
  }

  const templateStyle = {
    modern: {
      card: "border-dashed print:border-none print:shadow-none",
      header: "text-center pb-4",
      title: "text-2xl font-bold tracking-wider uppercase",
      description: "text-sm text-muted-foreground"
    },
    classic: {
      card: "border-solid print:border-solid print:shadow-none font-mono",
      header: "border-b-2 border-dashed pb-2 mb-4 text-center",
      title: "text-xl font-semibold",
      description: "text-xs"
    }
  }[settings.receiptTemplate];


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
      
      <div className="printable-area max-w-2xl mx-auto bg-white p-4 print:p-0">
        <Card className={cn(templateStyle.card)}>
          <CardHeader className={templateStyle.header}>
            <CardTitle className={templateStyle.title}>{settings.receiptName}</CardTitle>
            <CardDescription className={templateStyle.description}>
              {title} - Generated on: {new Date().toLocaleString()}
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
