import { useEffect, useState } from "react"
import { axiosInstance } from "../axiosConfig"



export const useCategory = (category:string|null)=>{
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    


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