"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSettings } from "@/hooks/use-settings";
import { ReceiptTemplate } from "@/lib/types";
import { useEffect } from "react";

const settingsSchema = z.object({
  receiptName: z.string().min(1, "Receipt name cannot be empty."),
  currency: z.string().min(1, "Currency symbol cannot be empty.").max(5, "Currency symbol is too long."),
  receiptTemplate: z.enum(["classic", "modern"]),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { settings, setReceiptName, setCurrency, setReceiptTemplate, isLoaded } = useSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      receiptName: settings.receiptName,
      currency: settings.currency,
      receiptTemplate: settings.receiptTemplate,
    },
  });

  useEffect(() => {
    if (isLoaded) {
      form.reset(settings);
    }
  }, [isLoaded, settings, form]);

  const onSubmit = (data: SettingsFormValues) => {
    setReceiptName(data.receiptName);
    setCurrency(data.currency);
    setReceiptTemplate(data.receiptTemplate as ReceiptTemplate);
  };

  if (!isLoaded) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Manage your point-of-sale settings. Changes are saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="receiptName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>POS / Receipt Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Business Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This name will appear on the POS screen and on receipts.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. KES, $, €" {...field} />
                    </FormControl>
                    <FormDescription>
                      The currency symbol to be used across the application.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receiptTemplate"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Receipt Template</FormLabel>
                     <FormDescription>
                      Choose the visual style for your printed reports.
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="modern" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Modern
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="classic" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Classic
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
