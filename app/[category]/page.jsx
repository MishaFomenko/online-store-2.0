 'use client'
 import { useState, useEffect } from 'react'
 import ProductCard from '../components/productcard'

 export default function Page({params}) {
    const [prodsByCat, setProdsByCat] = useState([]);

    const fetchProdsByCat = async (action) => {
        const jdoc = await fetch(`./api/products?action=${action}&category=${params.category.toLowerCase()}`, {
            method: 'GET',
            'Content-Type': 'application/json',
        })
        const doc = await jdoc.json();
        return doc;
        }

    const handleBestSellers = async () => {
        const prods = await fetchProdsByCat('categorypage')
        setProdsByCat(prods);
    };
      

      useEffect(()=>{
        if (prodsByCat.length===0) {
            handleBestSellers() 
        }
      })

    return (
        <>
        <div className='flex flex-wrap'>
        {prodsByCat.length!==0 && prodsByCat.map((item)=><ProductCard key={item.asin} item={item}/>)}
        </div>
        </>
    )
 }