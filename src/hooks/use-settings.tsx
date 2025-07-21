"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings, ReceiptTemplate } from '@/lib/types';
import { useToast } from './use-toast';

interface SettingsContextType {
  settings: AppSettings;
  setCurrency: (currency: string) => void;
  setReceiptName: (name: string) => void;
  setReceiptTemplate: (template: ReceiptTemplate) => void;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: AppSettings = {
  currency: 'KES',
  receiptName: 'Veridian POS',
  receiptTemplate: 'modern',
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('appSettings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveSettings = (newSettings: AppSettings) => {
    try {
      localStorage.setItem('appSettings', JSON.stringify(newSettings));
      setSettings(newSettings);
      toast({
        title: "Settings Saved",
        description: "Your new settings have been applied.",
      });
    } catch (error) {
      console.error("Failed to save settings to localStorage", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save settings.",
      });
    }
  };

  const setCurrency = (currency: string) => {
    saveSettings({ ...settings, currency });
  };

  const setReceiptName = (receiptName: string) => {
    saveSettings({ ...settings, receiptName });
  };

  const setReceiptTemplate = (receiptTemplate: ReceiptTemplate) => {
    saveSettings({ ...settings, receiptTemplate });
  };

  return (
    <SettingsContext.Provider value={{ settings, setCurrency, setReceiptName, setReceiptTemplate, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
