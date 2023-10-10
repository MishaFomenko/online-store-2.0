import './globals.css'
import type { Metadata } from 'next'
import ClientRootLayout from './layout-client'


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
    <ClientRootLayout>
      {children}
    </ClientRootLayout>
  )
}