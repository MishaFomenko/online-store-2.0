'use client'
import { useState, useEffect } from 'react'
import ProductCard from '../../components/productcard'

export default function Page({params}) {
   const [prodsByKw, setProdsByKw] = useState([]);

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
       {prodsByKw.length!==0 && prodsByKw.map((item)=><ProductCard key={item.asin} imageURL={item.imgUrl} price={item.price} description={item.productDescription}/>)}
       </div>
       </>
   )
}