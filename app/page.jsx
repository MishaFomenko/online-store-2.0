'use client'
import Shop from './components/shop'
import { useUserContext } from './context/userContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    user === null && router.push('/registration')
  })

  return (
    <div>
      {user !== null && <Shop />}
    </div>
  )
}

