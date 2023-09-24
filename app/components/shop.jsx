import ProductCard from './productcard'


export default function Shop() {
    const fetchCategory = async (action, collection, document) => {
        const jdoc = await fetch(`./api/products?action=${action}&collection=${collection}&document=${document}`, {
            method: 'GET',
            'Content-Type': 'application/json',
        })
        const doc = await jdoc.json();
        console.log(doc)
    }
    const bs = [1,2,3,4,5,6];
    const sg = [1,2,3,4,5,6];
    return(
        <>
        <div className='h-16 bg-blue-400 flex items-center p-6'>Best Sellers</div>
        <div className='flex flex-wrap'>
        {bs.map((item)=><ProductCard key={item}/>)}
        </div>
        <div className='h-16 bg-blue-400 flex items-center p-6'>Suggested for you</div>
        <div className='flex flex-wrap'>
        {sg.map((item)=><ProductCard key={item}/>)}
        </div>
        </>
    )
}
