import { useParams } from "react-router"
import { categories } from "../categories"
import Error from "./Error"
import ProductCardSkeleton from "../components/ProductCardSkeleton"
import { useCategory } from "../hooks/UseCategory"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { useCart } from "../hooks/useCart"
import { CartItem } from "../types"

const Category = () => {
  const {categoryType} = useParams()
  const userCart : CartItem[] | [] = useCart().cart
  const loadingCart : boolean = useCart().loading
  const [cart,setCart] = useState<CartItem[] | []>(userCart)

  useEffect(()=>{
    setCart(userCart)
  },[userCart])
  
  const {products,loading} = useCategory(categoryType)


    if(categoryType && !categories.includes(categoryType)){
      return <Error/>
  }
  
  return (
    <>
    <h1 className='text-center text-4xl my-6'>{categoryType}</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {(loading || loadingCart) && Array.from({length: 3}).map((_,index)=>(
        <ProductCardSkeleton key={index}/>
      ))}

      {(!loading && !loadingCart) && products.map((product,index)=>(
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

export default Category