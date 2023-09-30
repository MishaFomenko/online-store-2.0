'use client'
import { useEffect, useState } from 'react'
import { useUserContext } from '../context/usercontext'
import { useRouter } from 'next/navigation'



export default function Profile() {
    const [userData, setUserData] = useState({});
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

    useEffect(()=>{
       if (user === null) {
          router.push('/signin') 
        } else if (!userData.first) {
            async function fetchUser(action, collection, document) {
                const res = await fetch(`../api/userdata?action=${action}&collection=${collection}&document=${document}`, {
                    method: 'GET',
                    'Content-Type': 'application/json',
                })
                const userD = await res.json();
                setUserData(userD)
            };
            fetchUser('getuser', 'userdata', user.uid)
        }

        
    })
    return (
        <>
        <p>Profile page</p>
        <p>{user !== null && userData.first && `Hello ${userData.first} ${userData.last} !`}</p>
        </>
    )
}