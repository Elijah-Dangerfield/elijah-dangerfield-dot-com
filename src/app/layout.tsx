import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { Footer, Header } from '@/components/layouts';
import { AppProvider } from '@/app/provider';

import '@/styles/globals.css';

export const metadata = {
  title: 'Elijah Dangerfield - Software Engineer',
  description:
    'Personal website of Elijah Dangerfield - Software Engineer passionate about building great products',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
