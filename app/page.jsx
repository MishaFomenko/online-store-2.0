'use client'
import Shop from './components/shop'
import { useUserContext } from './context/usercontext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

export default function Home() {
  const router = useRouter();
  const {user, db} = useUserContext();
  let data = {};

  useEffect(()=>{
    user===null && router.push('/registration')
  },[])

  


  return (
    <div>
    {user!==null && <Shop />}
    </div>
  )
}

