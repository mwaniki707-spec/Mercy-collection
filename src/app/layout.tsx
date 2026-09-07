import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: 'Mercy Collections - Elegant Dresses Boutique',
  description: 'Modern boutique for elegant dresses. Shop the latest fashion for women ages 18-50.',
  keywords: 'dresses, fashion, boutique, women\'s clothing, elegant dresses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-stone-100 py-6 sm:py-8 mt-8 sm:mt-16 border-t border-amber-100">
          <div className="container text-center">
            <p className="text-dark-gray">
              &copy; 2025 Mercy Collections. All rights reserved.
            </p>
            <p className="mt-2">
              <a 
                href="https://wa.me/254114335365" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark"
              >
                Contact Us on WhatsApp
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

