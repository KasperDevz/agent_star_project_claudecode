import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import SpriteLoader from '@/components/SpriteLoader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jbmono', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Agent Star Rewards — Siam Refractory',
  description: 'Sales agent rewards program',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <AppProvider>
          <SpriteLoader />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
