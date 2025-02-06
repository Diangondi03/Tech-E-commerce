
import { useEffect, useState } from 'react'
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
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useCart } from '../hooks/useCart'

function Home() {
  
  const {products,loading} = useTrending()

  const userCart = useCart().cart
  const loadingCart = useCart().loading
  const [cart,setCart] = useState(userCart)

  useEffect(()=>{
    setCart(userCart)
  },[userCart])


  return (
    <>
      <Carousel/>
      <h2 className='font-bold text-center text-4xl my-16'>Products</h2>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-8'>
        {categories.map((category,index) => (
          <CategoryCard key={index} image={images[index]} name={category}/>
        ))}

      </div>
      <h2 className='font-bold text-center text-4xl my-16'>Trending</h2>


      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
        {(loading || loadingCart) && Array.from({length: 10}).map((_,index)=>(
          <ProductCardSkeleton/>
        ))}
        {!loading && !loadingCart && products.map((product,index)=>(
          <ProductCard 
          key={index}
          imageUrl={product?.image}
          title={product?.title}
          price={product?.price}
          discountPercentage={product?.discount}
          id={product?.id}
          quantity={cart.find(item=>item?.productId===product?.id)?.quantity || 0}
          />
        ))}
      </div>

    </>
  )
}

export default Home
