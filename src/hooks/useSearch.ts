import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";
import { Product } from "../types";

export const useSearch = (searchTerm:string|null)=>{
    const [products,setProducts] = useState<Product[] | null>(null)
    const [loading,setLoading] = useState<boolean>(true)
    const [filteredProducts,setFilteredProducts] = useState<Product[] | []>([])

    useEffect(()=>{
        const fetchCategoryProducts = async()=>{
            const res = await axiosInstance.get("products?limit=150")
            setProducts(res.data.products)
        }
        fetchCategoryProducts()
    },[])

    useEffect(()=>{
        setLoading(true)
        if(searchTerm && products){
            const fuse = new Fuse(products,{
                keys:['title','brand','category','description','color'],
                threshold:0.3
            })
            const results = fuse.search(searchTerm)
            setFilteredProducts(results.map(result=>result.item))
            setLoading(false)
        }
    },[searchTerm,products])

    return {filteredProducts,loading}
}