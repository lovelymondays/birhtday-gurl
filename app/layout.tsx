import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: 'Happy Birthday, Beautiful!',
  description: 'A magical birthday celebration for someone truly special',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a0a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_dancing.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
