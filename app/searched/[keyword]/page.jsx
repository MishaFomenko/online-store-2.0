'use client'
import { useState, useEffect } from 'react'
import ProductCard from '../../components/productcard'
import {useRouter} from 'next/navigation'
import {useUserContext} from '../../context/usercontext'

export default function Page({params}) {
   const [prodsByKw, setProdsByKw] = useState([]);

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

   const fetchProdsByKw = async (action) => {
       const jdoc = await fetch(`../api/products?action=${action}&kw=${params.keyword.toLowerCase()}`, {
           method: 'GET',
           'Content-Type': 'application/json',
       })
       const doc = await jdoc.json();
       return doc;
       }

   const handleProdsByKw = async () => {
       const prods = await fetchProdsByKw('keywordsearch')
       setProdsByKw(prods);
   };
     

     useEffect(()=>{
       if (prodsByKw.length===0) {
        handleProdsByKw() 
       }
     })

     

   return (
       <>
       <div className='flex flex-wrap'>
       {prodsByKw.length!==0 && prodsByKw.map((item)=>
           <ProductCard key={item.asin} item={item}/>)
        }
       </div>
       </>
   )
}