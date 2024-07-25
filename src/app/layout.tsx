import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider}  from '@/providers/theme-providers';

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayki",
  description: "Your all in one Solution for your Saas business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

   
      <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </body>
        
      </html>
    
    
  );
}
