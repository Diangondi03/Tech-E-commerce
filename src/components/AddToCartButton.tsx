import { Button } from '@heroui/react'
import { use } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { BiCart, BiMinus, BiPlus } from 'react-icons/bi'
import { useCart } from '../hooks/useCart'
import { dbAxiosInstance } from '../axiosConfig'
import { getUserId } from '../getUserId'

type AddToCartButtonProps = {
    productId: number,
    quantity: number
}

const AddToCartButton = ({productId,quantity}:AddToCartButtonProps) => {
    const [productQuantity, setProductQuantity] = useState(quantity)
    const userId = getUserId()

    const handleAddToCart = async() => {
        
        setProductQuantity(1)
        await dbAxiosInstance.post("add-product",{userId,productId})
    }
    //type == true ? increment : decrement
    const updateQuantity = async(type) => {
        if(type && productQuantity===100) return
        if(!type && productQuantity===0){
            await dbAxiosInstance.post("remove-product",{userId,productId})
            setProductQuantity(0)
            return
        }
        if(productQuantity<=100){
            setProductQuantity(prev=>type?prev+1:prev-1)

            await dbAxiosInstance.post('update-product-quantity',{userId,productId:productId,quantity:(type ? productQuantity+1 : productQuantity-1)})
        }
    }

    return (
        <>
        {productQuantity==0 ? (
            <Button className="w-full cursor-pointer bg-near-black text-white dark:bg-neutral-300 dark:text-black" onPress={handleAddToCart}>
                <BiCart className="w-5 h-5 mr-2" />
                Add to Cart
            </Button>
        ) : (
            <div className="flex items-center justify-between">
            <Button color="primary" variant="ghost" className="p-2 cursor-pointer bg-near-black text-white dark:bg-neutral-300 dark:text-black" onPress={()=>updateQuantity(false)}>
                <BiMinus className="w-5 h-5" />
            </Button>
            <span className="text-lg font-semibold">{productQuantity}</span>
            <Button color="primary" variant="ghost" className="p-2 cursor-pointer bg-near-black text-white dark:bg-neutral-300 dark:text-black" onPress={()=>updateQuantity(true)}>
                <BiPlus className="w-5 h-5" />
            </Button>
            </div>
        )}
    </>
  )
}

export default AddToCartButton