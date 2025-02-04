import { useParams } from "react-router"
import { categories } from "../categories"
import Error from "./Error"
import ProductCardSkeleton from "../components/ProductCardSkeleton"
import { useCategory } from "../hooks/UseCategory"
import ProductCard from "../components/ProductCard"

const Category = () => {
  const {categoryType} = useParams()
  
  const {products,loading} = useCategory(categoryType)
  
    if(!categories.includes(categoryType)){
      return <Error/>
  }
  
  return (
    <>
    <h1 className='text-center text-4xl my-6'>{categoryType}</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {loading && Array.from({length: 3}).map((_,index)=>(
        <ProductCardSkeleton/>
      ))}

      {!loading && products.map((product,index)=>(
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

export default Category