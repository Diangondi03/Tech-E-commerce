import { Image } from "@heroui/react"
import { CgUnavailable } from "react-icons/cg";
import { useNavigate } from "react-router"
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  imageUrl: string
  title: string
  price: number
  discountPercentage: number | undefined
  id: number,
  quantity:number
}

export default function ProductCard({ imageUrl, title, price, discountPercentage, id,quantity }: ProductCardProps) {

  const navigate = useNavigate()

  const discountedPrice : number = discountPercentage ? price * (1 - discountPercentage / 100) : 0


  const handleClick = () => {
    navigate(`/product/${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="max-w-sm sm:mx-auto overflow-hidden bg-white dark:bg-dark-gray rounded-lg cursor-pointer shadow-md hover:shadow-xl transition duration-300 ease-in-out h-full"
    >
      <div className="relative w-full">
        <span className="w-full min-w-sm h-full aspect-[4/3] bg-gray-400 absolute z-0 flex justify-center items-center">
        <CgUnavailable className="text-4xl text-white"/>
        </span>
        <Image src={imageUrl} alt={title} className="w-full min-w-sm h-full aspect-[4/3] object-cover transition-filter duration-300 dark:filter dark:contrast-75" />
        {discountPercentage && (
          <div className="absolute z-10 top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold border-1">
            {discountPercentage}%
          </div>
        )}
      </div>
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold truncate" title={title}>
          {title}
        </h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-950 dark:text-purple-300">
              ${discountPercentage ? discountedPrice.toFixed(2) : price.toFixed(2)}
            </span>
            {discountPercentage && (
              <span className="text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
            )}
          </div>
        </div>

        <AddToCartButton productId={id} quantity={quantity}/>

      </div>
    </div>
  )
}