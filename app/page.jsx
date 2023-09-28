'use client'
import Shop from './components/shop'
import { useUserContext } from './context/usercontext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'



export default function Home() {
  const router = useRouter();
  const {user, setUser} = useUserContext();
  let prevUser = null;

  useEffect(()=>{
    if (user===null) {
      try {
        prevUser = JSON.parse(sessionStorage.getItem('firebase:authUser:AIzaSyCoGURJeUWdIylWkAEDYEpOqY6YnAaJYy0:[DEFAULT]'))
        setUser(prevUser)
      } catch {}
    }
  })
  

  useEffect(()=>{
    user===null && prevUser===null && router.push('/registration')
  },[])

  


  return (
    <div>
    {user!==null && <Shop />}
    </div>
  )
}

