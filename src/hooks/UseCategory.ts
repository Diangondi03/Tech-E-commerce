import { useEffect, useState } from "react"
import { axiosInstance } from "../axiosConfig"
import { Product } from "../types"

export const useCategory = (category:string|undefined)=>{
    const [products,setProducts] = useState<Product[] | []>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
        setLoading(true)
        const fetchCategoryProducts = async()=>{
            const res = await axiosInstance.get(`products/category?type=${category?.toLowerCase()}`)
            setProducts(res.data.products)
            setLoading(false)
        }
        fetchCategoryProducts()
    },[category])
    
    return {products,loading}
}