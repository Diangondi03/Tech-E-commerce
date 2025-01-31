
import { useEffect } from 'react'
import Carousel from '../components/Home/Carousel'
import TV2 from '../assets/tv2.webp'
import Audio from '../assets/audio.jpg'
import Mobile from '../assets/mobile.jpg'
import Laptop from '../assets/laptop.jpg'
import Gaming from '../assets/gaming.jpg'
import Appliances from '../assets/appliances.jpg'

import CategoryCard from '../components/Home/CategoryCard'

const images = [TV2,Audio,Mobile,Laptop,Gaming,Appliances]  

import { categories } from '../categories'
import { useTrending } from '../hooks/useTrending'
import ProductCard from '../components/ProductCard'

function Home() {
  
  const products = useTrending()
  console.log(products)

  useEffect(()=>{

    const theme  = localStorage.getItem("theme")
    const html = document.querySelector("html")
    if(theme=='1'){
      html?.classList.add("dark")
    }
  },[])

  return (
    <>
      <Carousel/>
      <h1 className='font-bold text-center text-4xl my-16'>Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-8'>
        {categories.map((category,index) => (
          <CategoryCard key={index} image={images[index]} name={category}/>
        ))}

      </div>
      <h1 className='font-bold text-center text-4xl my-16'>Trending</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {products && products.map((product,index)=>(
        <ProductCard 
        key={index}
        imageUrl={product?.image}
        title={product?.title}
        price={product?.price}
        discountPercentage={product?.discount}
        id={product?.id}
        />
      ))}
      </div>

    </>
  )
}

export default Home
