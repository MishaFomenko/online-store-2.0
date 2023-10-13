'use client';
import { useUserContext } from './context/userContext';
import dynamic from 'next/dynamic';
import { useCustomRedirect } from './customHooks';


const Shop = dynamic(() => import('./components/shop'), { ssr: false })

export default function Home() {
  const { user } = useUserContext();

  useCustomRedirect('/signin', user);

  return (
    <div>
      <Shop />
    </div>
  )
}

