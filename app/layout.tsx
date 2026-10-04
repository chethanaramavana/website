import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ramavanamath.com'),
  title: 'Ramavana Mathematical Centre | Mathematics Practice',
  description:
    'Chapter-wise mathematics practice for CBSE, ICSE and IGCSE students.',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '64x64' }],
    shortcut: '/favicon.png',
    apple: '/ramavana-mark.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://ramavanamath.com',
    siteName: 'Ramavana Mathematical Centre',
    title: 'Ramavana Mathematical Centre | Mathematics Practice',
    description:
      'Clear chapter notes and exam-style mathematics practice for Grades 5 to 12.',
    images: [
      {
        url: '/ramavana-pamphlet-whatsapp.jpg',
        width: 1749,
        height: 2481,
        alt: 'Ramavana Mathematical Centre student pamphlet',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramavana Mathematical Centre | Mathematics Practice',
    description:
      'Clear chapter notes and exam-style mathematics practice for Grades 5 to 12.',
    images: ['/ramavana-pamphlet-whatsapp.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
