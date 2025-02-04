import { Button } from '@heroui/react'
import React, { useState } from 'react'
import { BiCart, BiMinus, BiPlus } from 'react-icons/bi'

type AddToCartButtonProps = {
    productId: number
}

const AddToCartButton = ({productId}:AddToCartButtonProps) => {
    const [quantity, setQuantity] = useState(0)

    const handleAddToCart = () => {
        setQuantity(1)
    }

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleDecrement = () => {
        setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
    }
    return (
        <>
        {quantity === 0 ? (
            <Button className="w-full cursor-pointer bg-near-black text-white dark:bg-neutral-300 dark:text-black" onPress={handleAddToCart}>
            <BiCart className="w-5 h-5 mr-2" />
            Add to Cart
            </Button>
        ) : (
            <div className="flex items-center justify-between">
            <Button color="primary" variant="ghost" className="p-2 cursor-pointer bg-near-black text-white dark:bg-neutral-300 dark:text-black" onPress={handleDecrement}>
                <BiMinus className="w-5 h-5" />
            </Button>
            <span className="text-lg font-semibold">{quantity}</span>
            <Button color="primary" variant="ghost" className="p-2 cursor-pointer bg-near-black text-white dark:bg-neutral-300 dark:text-black" onPress={handleIncrement}>
                <BiPlus className="w-5 h-5" />
            </Button>
            </div>
        )}
    </>
  )
}

export default AddToCartButton