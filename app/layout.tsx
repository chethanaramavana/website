import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './identity.css';
import SessionRenewal from './session-renewal';
import StudentPresence from './student-activity';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;600;700;800&family=Shrikhand&family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SessionRenewal />
        <StudentPresence />
      </body>
    </html>
  );
}
