import { useState } from "react"
import { BiMinus,BiPlus,BiTrash } from "react-icons/bi"
import { useProduct } from "../../hooks/useProduct"
import { Link, useNavigate } from "react-router"
import { CgUnavailable } from "react-icons/cg"
import { getUserId } from "../../getUserId"
import { dbAxiosInstance } from "../../axiosConfig"

export default function CartItem({product,setCart}) {
  const navigate = useNavigate()
  const userId = getUserId()


  const discountedPrice = (product?.price*(1-product?.discount/100)).toFixed(2)

  //type = true for increase, false for decrease
  const updateQuantity = async (type:boolean)=>{
    if(type && product?.quantity>=100) return
    
    if(!type && product?.quantity===1){

      setCart(prev=>prev.filter(item=>item.productId!==product?.id))
      await dbAxiosInstance.post('remove-product',{userId,productId:product?.id})
      return
    }

    if(product?.quantity<=100){
      setCart(prev=>{
          return prev.map(item=>{
              if(item.productId === product?.id){
                  return {...item,quantity:type?product?.quantity+1:product?.quantity-1}
              }
              return item
          })
      })
      await dbAxiosInstance.post('update-product-quantity',{userId,productId:product?.id,quantity:type?product?.quantity+1:product?.quantity-1})
    }

  }

  const removeProduct = async ()=>{
    setCart(prev=>prev.filter(item=>item.productId!==product?.id))
    await dbAxiosInstance.post('remove-product',{userId,productId:product?.id})
  }


  const goToProduct = ()=>{
      navigate(`/product/${product?.id}`)
  }

  

  return (
    <div className="p-4 border-b dark:white relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 flex items-center space-x-4">
          <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-400">
            <span className="absolute w-full z-0 h-full flex justify-center items-center">
              <CgUnavailable className="text-4xl text-white"/>
              
              
            </span>
            <img
              src={product?.image || "/placeholder.svg"}
              alt={product?.title}
              width={80}
              height={80}
              className="w-full h-full object-cover z-10 cursor-pointer"
              onClick={goToProduct}
            />
          </div>
          <div>
            <Link to={`/product/${product?.id}`} className="font-semibold block hover:underline">{product?.title}</Link>
            {product?.discount && <span className="text-sm text-green-600">Save ${(product?.price - discountedPrice).toFixed(2)}</span>}
          </div>
        </div>
        <div className="md:col-span-2 flex justify-between md:block">
          <span className="font-semibold md:block">
            ${product?.discount ? discountedPrice : product?.price.toFixed(2)}
            </span>
          {product?.discount && (
            <span className="text-sm text-gray-500 line-through md:ml-2">${product?.price.toFixed(2)}</span>
          )}
        </div>
        <div className="md:col-span-2 flex items-center justify-between md:justify-start">
          <span className="md:hidden">Quantity:</span>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-full text-white bg-gray-600 hover:bg-gray-500 transition duration-200 cursor-pointer">
              <BiMinus className="w-4 h-4" onClick={()=>updateQuantity(false)}/>
            </button>
            <span>{product?.quantity}</span>
            <button className="p-1 rounded-full text-white bg-gray-600 hover:bg-gray-500 transition duration-200 cursor-pointer">
              <BiPlus className="w-4 h-4" onClick={()=>updateQuantity(true)}/>
            </button>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-between md:block">
          <span className="md:hidden">Subtotal:</span>
          <span className="font-semibold">
            ${product?.discount ? (discountedPrice*product?.quantity).toFixed(2) : (product?.price*product?.quantity).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-end md:absolute md:right-6">
          <button onClick={removeProduct} className="text-red-600 hover:text-red-800 transition duration-200 cursor-pointer">
            <BiTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

