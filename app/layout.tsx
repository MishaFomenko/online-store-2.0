import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ResponsiveAppBar from './components/navigation'
import { UserContextProvider } from './context/usercontext'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Online Store 2.0',
  description: 'Advanced web app for shopping online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <ResponsiveAppBar />
          {children}
        </UserContextProvider>
        
        </body>
    </html>
  )
}
