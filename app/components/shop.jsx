'use client'
import ProductCard from './productcard'
import {useEffect, useState} from 'react'




export default function Shop() {
    const [bs, setBs] = useState([]);
    const fetchBests = async (action) => {
        const jdoc = await fetch(`./api/products?action=${action}`, {
            method: 'GET',
            'Content-Type': 'application/json',
        })
        const doc = await jdoc.json();
        return doc;
        }

    const handleBestSellers = async () => {
        const bests = await fetchBests('homepage')
        setBs(bests);
    };
      

      useEffect(()=>{
        if (bs.length===0) {
           handleBestSellers() 
        }
      })


      const handleAlgolia = async () => {
        const allData = await getDocs(collection(db, 'store'));
          const promises = allData.docs.map(async (document) => {
          const prods = await getDocs(collection(db, 'store', document.id, 'searchProductDetails'));
          const prodsPromises = prods.docs.map(async (prod) => {
              const prodData = await prod.data();
              const note = prodData;
              note.objectID = note.asin;
              index.saveObject(note);
          });
          await Promise.all(prodsPromises);
          });
          await Promise.all(promises);
      }
      
    return(
        <>
        <div className='h-16 bg-blue-400 flex items-center p-6'>Best Sellers</div>
        <div className='flex flex-wrap'>
        {bs.length!==0 && bs.map((item)=><ProductCard key={item.asin} imageURL={item.imgUrl} price={item.price} description={item.productDescription}/>)}
        </div>
        <div className='h-16 bg-blue-400 flex items-center p-6'>Suggested for you</div>
        <div className='flex flex-wrap'>
        {bs.length!==0 && bs.map((item)=><ProductCard key={item.asin} imageURL={item.imgUrl} price={item.price} description={item.productDescription}/>)}
        </div>
        </>
    )
}
