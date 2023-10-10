'use client';
import { useUserContext } from './context/userContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Shop = dynamic(() => import('./components/shop'), { ssr: false })

export default function Home() {
  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    user === null && router.push('/registration');
  });

  return (
    <div>
      <Shop />
    </div>
  )
}

