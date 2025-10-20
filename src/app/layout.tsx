import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ubuntu 2025 Events Dashboard',
  description: 'Official Ubuntu 2025 College Fest Events Management Dashboard',
  keywords: 'Ubuntu 2025, college fest, events, dashboard, management',
  authors: [{ name: 'Ubuntu 2025 Team' }],
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Favicon Links */}
        <link rel="apple-touch-icon" sizes="180x180" href="/circle logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/circle logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/circle logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/circle logo.png" />
        
        {/* Theme Color for Mobile */}
        <meta name="theme-color" content="#e95420" />
        <meta name="msapplication-TileColor" content="#e95420" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen hero-gradient relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e95420' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
        <Toaster 
          position="top-right" 
          richColors 
          expand={true}
          closeButton
        />
      </body>
    </html>
  )
}
