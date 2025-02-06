import { useEffect, useState } from "react"
import { axiosInstance } from "../axiosConfig"
import { Product } from "../types"

export const useTrending = ()=>{
    const [products,setProducts] = useState<Product[] | []>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchTrendingProducts = async()=>{
            const res = await axiosInstance.get("products?limit=10")
            setProducts(res.data.products)
            setLoading(false)
        }
        fetchTrendingProducts()
    },[])
    return {products,loading}
}