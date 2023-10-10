'use client';
import { UserContextProvider } from './context/userContext';
import { CartContextProvider } from './context/cartContext';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

const ResponsiveAppBar = dynamic(() => import('./components/navigation'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

const ClientRootLayout = ({ children }) => {
    return (
        <html lang="en" className='h-full bg-white'>
            <body className={inter.className}>
                <UserContextProvider>
                    <CartContextProvider>
                        <ResponsiveAppBar />
                        {children}
                    </CartContextProvider>
                </UserContextProvider>
            </body>
        </html>
    );
};

export default ClientRootLayout;