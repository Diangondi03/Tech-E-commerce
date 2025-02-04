import { useState } from "react"
import { BiMinus,BiPlus,BiTrash } from "react-icons/bi"

export default function CartItem({ product,setTotal }) {
    const [quantity,setQuantity] = useState(product?.quantity)


    const increaseQuantity = ()=>{
        if(quantity<100){
            setQuantity(quantity+1)
            setTotal(prev=>prev+product.discountedPrice)
        }
    }
    const decreaseQuantity = ()=>{
        if(quantity>0){
            setQuantity(quantity-1)
            setTotal(prev=>prev-product.discountedPrice)

        }
    }

  return (
    <div className="p-4 border-b dark:white relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 flex items-center space-x-4">
          <div className="w-20 h-20  rounded-md overflow-hidden flex-shrink-0 bg-gray-400">
            <image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            {product?.discountedPrice && <span className="text-sm text-green-600">Save ${(product.price - product.discountedPrice).toFixed(2)}</span>}
          </div>
        </div>
        <div className="md:col-span-2 flex justify-between md:block">
          <span className="font-semibold md:block">${product.discountedPrice.toFixed(2)}</span>
          {product?.discountPrice && (
            <span className="text-sm text-gray-500 line-through md:ml-2">${product.price.toFixed(2)}</span>
          )}
        </div>
        <div className="md:col-span-2 flex items-center justify-between md:justify-start">
          <span className="md:hidden">Quantity:</span>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-full text-white bg-gray-600 hover:bg-gray-500 transition duration-200">
              <BiMinus className="w-4 h-4" onClick={decreaseQuantity}/>
            </button>
            <span>{quantity}</span>
            <button className="p-1 rounded-full text-white bg-gray-600 hover:bg-gray-500 transition duration-200">
              <BiPlus className="w-4 h-4" onClick={increaseQuantity}/>
            </button>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-between md:block">
          <span className="md:hidden">Subtotal:</span>
          <span className="font-semibold">${(product.discountedPrice*quantity).toFixed(2)}</span>
        </div>
        <div className="flex justify-end md:absolute md:right-6">
          <button className="text-red-600 hover:text-red-800 transition duration-200 cursor-pointer">
            <BiTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

