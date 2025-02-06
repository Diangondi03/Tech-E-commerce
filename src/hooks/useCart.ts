import { useEffect, useState } from "react"
import { axiosInstance, dbAxiosInstance } from "../axiosConfig"
import { getUserId } from "../getUserId"

export const useCart = ()=>{
    const [cart,setCart] = useState([])
    const userId = getUserId()
    const [loading,setLoading] = useState(true)

    if(!userId){
        return {cart,loading:false}
    }

    useEffect(()=>{
        const fetchUserCart = async()=>{
            const products = []
            const res = await dbAxiosInstance.get(`get-user/${userId}`)

                for(const item of res.data.cart){
                    const product = await axiosInstance.get(`products/${item.productId}`)
                    products.push({...product.data.product,...item})
            }   

            setCart(products)
            setLoading(false)
        }
        fetchUserCart()
    },[])



    return {cart,loading}
}