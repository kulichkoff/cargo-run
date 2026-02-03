import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/widgets/sidebar';
import { ClientProviders } from '@/shared/lib';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cargo Run',
  description: 'Веди свой бизнес с умом',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <main className="py-6 w-[calc(100%-20rem)] mx-auto">{children}</main>
            <Toaster />
          </SidebarProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
