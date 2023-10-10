'use client';
import ResponsiveAppBar from './components/navigation';
import { UserContextProvider } from './context/userContext';
import { CartContextProvider } from './context/cartContext';
import { Inter } from 'next/font/google';

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