import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LIVE हिन्दुस्तान - भारत का विश्वसनीय हिंदी न्यूज पोर्टल',
  description: 'ताजा समाचार, ब्रेकिंग न्यूज, राजनीति, खेल, मनोरंजन और विश्लेषण। भारत का सबसे विश्वसनीय हिंदी न्यूज पोर्टल।',
  keywords: 'हिंदी न्यूज, समाचार, ब्रेकिंग न्यूज, भारत, राजनीति, खेल, मनोरंजन',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}