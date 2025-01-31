import { useEffect, useState } from "react"
import { axiosInstance } from "../axiosConfig"

export const useTrending = ()=>{
    const [products,setProducts] = useState([])

    useEffect(()=>{
        const fetchTrendingProducts = async()=>{
            const res = await axiosInstance.get("products?limit=10")
            setProducts(res.data.products)
        }
        fetchTrendingProducts()
    },[])
    return products
}