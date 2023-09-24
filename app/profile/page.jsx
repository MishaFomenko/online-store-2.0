'use client'
import { useEffect, useState } from 'react'
import { useUserContext } from '../context/usercontext'
import { useRouter } from 'next/navigation'


export default function Profile() {
    const {user} = useUserContext();
    const [userData, setUserData] = useState({});
    const route = useRouter();

    useEffect(()=>{
       if (user === null) {
          route.push('/signin') 
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