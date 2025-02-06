import { Button } from '@heroui/react'
import { useState } from 'react'
import { BiCart, BiMinus, BiPlus } from 'react-icons/bi'
import { dbAxiosInstance } from '../axiosConfig'
import { getUserId } from '../getUserId'
import { useNavigate } from 'react-router'

type AddToCartButtonProps = {
    productId: number,
    quantity: number
}

const AddToCartButton = ({productId,quantity}:AddToCartButtonProps) => {
    const [productQuantity, setProductQuantity] = useState<number>(quantity)
    const userId : string | null = getUserId()
    const navigate = useNavigate()
    const token : string | null = localStorage.getItem("token")

    const handleAddToCart = async() => {
        if(!token){
            navigate("/login")
            return
        }
        try{

            setProductQuantity(1)
            const res = await dbAxiosInstance.post("add-product",{userId,productId})
            if(res.status===403 || res.status===401){
                navigate("/login")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    //type == true ? increment : decrement
    const updateQuantity = async(type:boolean) => {
        if(!token){
            navigate("/login")
            return
        }
        try{

            if(type && productQuantity===100) return
            if(!type && productQuantity===0){
                const res = await dbAxiosInstance.post("remove-product",{userId,productId})
                if(res.status===403 || res.status===401){
                    navigate("/login")
                }
                setProductQuantity(0)
                return
            }
            if(productQuantity<=100){
                setProductQuantity(prev=>type?prev+1:prev-1)
        
                const res = await dbAxiosInstance.post('update-product-quantity',{userId,productId:productId,quantity:(type ? productQuantity+1 : productQuantity-1)})
                if(res.status===403 || res.status===401){
                    navigate("/login")
                }
            }
        }
        catch(err){
            console.log(err)
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