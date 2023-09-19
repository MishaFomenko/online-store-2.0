'use client'
import { useEffect, useState } from 'react'
import { useUserContext } from '../context/usercontext'


export default function Profile() {
    const {user} = useUserContext();
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('../api/userdata', {
                method: 'POST',
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    action: 'getuser',
                    collection: 'userdata',
                    document: user.uid,
                })
            })
            const userD = await res.json();
            setUserData(userD)
        };
        fetchUser()
    })
    return (
        <>
        <p>Profile page</p>
        <p>{`Hello ${userData.first} ${userData.last}`}</p>
        </>
    )
}